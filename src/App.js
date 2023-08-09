import { Component, Fragment } from 'react';
import { ToDoInput } from './components/todoinput/Todoinput';
import { ToDoList } from './components/todolist/Todolist';
import uuid from 'react-uuid';
import { ThemeContext, themes } from './components/context/theme-context';
import Toolbar from './components/context/themed-button';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      tittle: '',
      items: [],
      id: uuid(),
      updateTodosToShow: 'all',
      search: '',
      theme: themes,
    };
  }
  toggleTheme = () => {
    this.setState((state) => ({
      theme: state.theme === themes.dark ? themes.light : themes.dark,
    }));
  };
  handleChange = (event) => {
    this.setState({
      value: event.target.value,
    });
  };
  handleChangeTittle = (event) => {
    this.setState({
      tittle: event.target.value,
    });
  };
  handleClick = () => {
    if (this.state.tittle == '' || this.state.tittle.length < 3) {
      alert('write a normal title');
    } else {
      const newItem = {
        id: this.state.id,
        done: false,
        value: `${this.state.value}`,
        tittleMain: `${this.state.tittle}`,
        tittleSearch: this.state.tittle,
        edit: false,
        archive: false,
      };
      const updateItems = [...this.state.items, newItem];
      localStorage.setItem('id', JSON.stringify(updateItems));
      this.setState({
        items: updateItems,
        value: '',
        tittle: '',
        id: uuid(),
        edit: false,
      });
    }
  };
  handleDone = (event) => {
    for (let i = 0; i < this.state.items.length; i++) {
      if (
        event.target.parentElement.parentElement.id == this.state.items[i].id
      ) {
        const newItemsArray = [...this.state.items];
        newItemsArray[i].done = !newItemsArray[i].done;
        this.setState({ items: newItemsArray });
      }
    }
    localStorage.setItem('id', JSON.stringify(this.state.items));
  };
  handlDelete = (event) => {
    for (let i = 0; i < this.state.items.length; i++) {
      if (
        event.target.parentElement.parentElement.id == this.state.items[i].id
      ) {
        const newItemsArray = [...this.state.items];
        newItemsArray.splice(i, 1);
        this.setState({
          ...this.state,
          items: newItemsArray,
        });
        localStorage.setItem('id', JSON.stringify(newItemsArray));
        localStorage.setItem(
          'archive',
          JSON.stringify(newItemsArray.filter((el) => el.archive))
        );
      }
    }
  };
  handleArchive = (event) => {
    for (let i = 0; i < this.state.items.length; i++) {
      if (
        event.target.parentElement.parentElement.id == this.state.items[i].id
      ) {
        //localStorage.setItem('archive',JSON.stringify(this.state.items[i]))
        const newItemsArray = [...this.state.items];
        newItemsArray[i].archive = !newItemsArray[i].archive;
        this.setState({
          ...this.state,
          items: newItemsArray,
        });
      }
    }
    localStorage.setItem('id', JSON.stringify(this.state.items));
    localStorage.setItem(
      'archive',
      JSON.stringify(this.state.items.filter((el) => el.archive))
    );
  };
  handleEdit = (event) => {
    for (let i = 0; i < this.state.items.length; i++) {
      if (
        event.target.parentElement.parentElement.id == this.state.items[i].id
      ) {
        const newItemsArray = [...this.state.items];

        newItemsArray[i].edit = !newItemsArray[i].edit;
        newItemsArray[i].value =
          event.target.parentElement.parentElement.children[0].children[1].innerText;
        event.target.parentElement.parentElement.children[0].children[1].contentEditable =
          newItemsArray[i].edit;
        this.setState({
          ...this.state,
          items: newItemsArray,
        });
      }
    }
    localStorage.setItem('id', JSON.stringify(this.state.items));
  };
  checkLocalStorage() {
    if (localStorage.length > 0) {
      this.setState({
        items: JSON.parse(localStorage.getItem('id')),
      });
    }
  }
  updateTodosToShow = (show) => {
    this.setState({
      updateTodosToShow: show,
    });
  };

  componentDidMount() {
    this.checkLocalStorage();
  }

  debounce = (cb, dellay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => cb(...args), dellay);
    };
  };
  searchItem = (event) => {
    this.setState({
      search: event.target.value,
    });
  };
  debouncedLog = this.debounce(this.searchItem, 500);

  render() {
    let itemss = [];
    if (this.state.updateTodosToShow == 'all') {
      itemss = this.state.items.filter(
        (item) =>
          !item.archive &&
          item.tittleSearch
            .toLocaleLowerCase()
            .includes(this.state.search.toLocaleLowerCase())
      );
    } else if (this.state.updateTodosToShow == 'todo') {
      itemss = this.state.items.filter(
        (item) =>
          !item.done &&
          !item.archive &&
          item.tittleSearch
            .toLocaleLowerCase()
            .includes(this.state.search.toLocaleLowerCase())
      );
    } else if (this.state.updateTodosToShow == 'done') {
      itemss = this.state.items.filter(
        (item) =>
          item.done &&
          !item.archive &&
          item.tittleSearch
            .toLocaleLowerCase()
            .includes(this.state.search.toLocaleLowerCase())
      );
    } else if (this.state.updateTodosToShow == 'archive') {
      itemss = this.state.items.filter(
        (item) =>
          item.archive &&
          item.tittleSearch
            .toLocaleLowerCase()
            .includes(this.state.search.toLocaleLowerCase())
      );
    }
    return (
      <>
        <ThemeContext.Provider value={this.state.theme}>
          <Toolbar changeTheme={this.toggleTheme} />
          <div style={this.state.theme}>
            <h1>Todoinput</h1>
            <ToDoInput
              handleChange={this.handleChange}
              handleChangeTittle={this.handleChangeTittle}
              item={this.state.value}
              tittle={this.state.tittle}
              handleClick={this.handleClick}
            />

            <ToDoList
              items={itemss}
              handleDoneTask={this.handleDone}
              handleDelete={this.handlDelete}
              handleEdit={this.handleEdit}
              handleArchive={this.handleArchive}
              updateTodosToShow={this.updateTodosToShow}
              activeLink={this.state.updateTodosToShow}
              search={this.debouncedLog}
            />
          </div>
        </ThemeContext.Provider>
      </>
    );
  }
}
export default App;
