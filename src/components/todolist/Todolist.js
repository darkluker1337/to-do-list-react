import { Component } from 'react';
import './Todolist.css';
import { ToDoStatus } from '../todostatus/Todostatus';
import { Search } from '../search/Serach';

export class ToDoList extends Component {
  render() {
    const { items, handleDelete, handleEdit, handleDoneTask,updateTodosToShow, handleArchive, activeLink, search} = this.props;
    return (
      <>
      <Search search={search}/>
      <ul className='Todolist'>
        <div className='ButtonsFilter'>
            <button className={`ButtonFilter ${activeLink =='all' ? 'ButtonFilterActive' : ''}`}
              type='button'
              onClick={() => updateTodosToShow('all')}>
              All
            </button>
            <button className={`ButtonFilter ${activeLink =='done' ? 'ButtonFilterActive' : ''}`}
              type='button'
              onClick={() => updateTodosToShow('done')}>
              Done
            </button>

            <button className={`ButtonFilter ${activeLink =='todo' ? 'ButtonFilterActive' : ''}`}
              type='button'
              onClick={() => updateTodosToShow('todo')}>
              Todo
            </button>
            <button className={`ButtonFilter ${activeLink =='archive' ? 'ButtonFilterActive' : ''}`}
              type='button'
              onClick={() => updateTodosToShow('archive')}>
              archive
            </button>
        </div>

        {items.length == 0
          ? ''
          : items.map((el) => {
              return (
                <ToDoStatus
                  taskTittle={`${el.tittle}`}
                  handleDelete={handleDelete}
                  handleEdit={handleEdit}
                  handleDoneTask={handleDoneTask}
                  handleArchive={handleArchive}
                  className={el.done == false ? '' : 'liStatusDone'}
                  id={el.id}
                  changerTittle={el}
                  key={el.id}
                />
              );
            })}
      </ul>
      </>
    );
  }
}
