import { Component } from 'react';
import './Todostatus.css';
import { ThemeContext } from '../context/theme-context';
export class ToDoStatus extends Component {
  render() {
    const {
      handleDelete,
      handleEdit,
      handleDoneTask,
      taskTittle,
      id,
      className,
      handleArchive,
      changerTittle,
      taskValue,
    } = this.props;
    let theme = this.context;
    return (
      <li key={id} id={id} className='liStatus'>
        <p className={className}>
          <span>{taskTittle}</span>: <span>{taskValue}</span>
        </p>
        <div>
          {changerTittle.done ? (
            <span
              className='btnStatus'
              style={{ color: theme.input }}
              onClick={handleDoneTask}>
              &#9745;
            </span>
          ) : (
            <span
              className='btnStatus'
              style={{ color: theme.input }}
              onClick={handleDoneTask}>
              &#9744;
            </span>
          )}

          {!changerTittle.edit ? (
            <span
              className='btnStatus'
              style={{ color: theme.input }}
              onClick={handleEdit}>
              &#9998;
            </span>
          ) : (
            <span
              className='btnStatus'
              style={{ color: theme.input }}
              onClick={handleEdit}>
              save
            </span>
          )}

          <span
            className='btnStatus'
            style={{ color: theme.input }}
            onClick={handleDelete}>
            &#10008;
          </span>

          {!changerTittle.archive ? (
            <span
              className='btnStatus'
              style={{ color: theme.input }}
              onClick={handleArchive}>
              archive
            </span>
          ) : (
            <span
              className='btnStatus'
              style={{ color: theme.input }}
              onClick={handleArchive}>
              remove
            </span>
          )}
        </div>
      </li>
    );
  }
}
ToDoStatus.contextType = ThemeContext;
