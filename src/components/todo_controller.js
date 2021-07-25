import React from 'react';
import _ from 'lodash';
const TodoController = props => {
  return (
    <div className="todo-controller">
      <div className="w-80">
        <input
          ref={props.inputRef}
          type="text"
          onChange={e => {
            props.onChange && props.onChange(e.target.value);
          }}
          value={_.get(props, 'value')}
        />
      </div>
      <div className="w-20">
        <button
          onClick={() => {
            props.handleAdd && props.handleAdd();
          }}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default TodoController;
