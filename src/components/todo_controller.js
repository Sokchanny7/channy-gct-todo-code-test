import React from 'react';
const TodoController = props => {
  return (
    <div className="todo-controller">
      <div className="w-80">
        <input ref={props.inputRef} type="text" onChange={e => {}} />
      </div>
      <div className="w-20">
        <button onClick={props.handleAdd}>Add</button>
      </div>
    </div>
  );
};

export default TodoController;
