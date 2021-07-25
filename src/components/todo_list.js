import React from 'react';
import _ from 'lodash';

const TodoList = props => {
  return (
    <div className="todo-list">
      <table>
        <thead>
          <th>#</th>
          <th>Todo</th>
          <th />
        </thead>
        <tbody>
          {_.get(props, 'todoList') &&
            _.get(props, 'todoList').map((item, index) => {
              return (
                <tr>
                  <td>{_.get(item, 'value')}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default TodoList;
