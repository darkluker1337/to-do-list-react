import { Component } from 'react';
import './Todoinput.css';

export class ToDoInput extends Component {
  render() {
    const { handleChange, handleChangeTittle, handleClick, item, tittle } =
      this.props;

    return (
      <div className='todoinput'>
        <input className='inputText'
          onChange={handleChangeTittle}
          value={tittle}
          placeholder='tittle'></input>
        <input className='inputText'
          onChange={handleChange}
          value={item}
          placeholder='todosmth'></input>
        <button type='submit' className='InputBtn' onClick={handleClick}>
          Add new ToDo
        </button>
      </div>
    );
  }
}
