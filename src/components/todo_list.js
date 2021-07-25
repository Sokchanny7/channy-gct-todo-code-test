import React from 'react';
import _ from 'lodash';

const TodoList = props => {
  return (
    <div className="todo-list">
      <table>
        <thead>
          <th>Todo</th>
          <th width={100} />
        </thead>
        <tbody>
          {_.get(props, 'todoList') &&
            _.get(props, 'todoList').map((item, index) => {
              return (
                <tr>
                  
                  <td
                    onClick={() => {
                      props.handleSingleClick && props.handleSingleClick(index);
                    }}
                  >
                    <p
                      className={`${
                        _.get(item, 'completed') ? 'completed-text' : ''
                      }`}
                    >
                      {_.get(item, 'value')}
                    </p>
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        props.handleEdit && props.handleEdit(item);
                      }}
                      className="edit-button action-button"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        props.handleDelete && props.handleDelete(item);
                      }}
                      className="remove-button action-button"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default TodoList;
