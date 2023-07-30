import { ThemeContext } from './theme-context';
import { Component } from 'react';
import './btnTheme.css'

class ThemedButton extends Component {
  render() {
    let props = this.props;
    let theme = this.context;
    return <button {...props} className='btnTheme' style={{ backgroundColor: theme.background, color:theme.color, borderColor:'lightblue' } } />;
  }
}
ThemedButton.contextType = ThemeContext;

class Toolbar extends Component {
  render(){
    const {changeTheme} = this.props
    return (
      <ThemedButton onClick={changeTheme}>
        Change Theme
      </ThemedButton>
    );}
  }

export default Toolbar;
