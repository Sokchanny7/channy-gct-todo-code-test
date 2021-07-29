import React from 'react';
import _ from 'lodash';

const TodoList = props => {
  return (
    <div className="todo-list">
      <table>
        <thead>
          <tr>
            <th colSpan={2} align="right">
              <div className="row">
                <div>Todo</div>
                <div>
                  <button
                    className="complete-button"
                    onClick={() => {
                      props.handleCompletAll && props.handleCompletAll();
                    }}
                  >
                    Complete all
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => {
                      props.handleDeleteAll && props.handleDeleteAll();
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {!_.get(props, 'isEmpty') &&
            _.get(props, 'todoList') &&
            _.get(props, 'todoList').map((item, index) => {
              return (
                <tr>
                  <td
                    width="70%"
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
                    <i className="date">{_.get(item, 'date')}</i>
                  </td>
                  <td align="right">
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
