import React from 'react';
const TodoController = props => {
  return (
    <div>
      <div>
        <input ref={props.inputRef} type="text" onChange={e => {}} />
      </div>
      <div>
        <button onClick={props.handleAdd}>Add</button>
      </div>
    </div>
  );
};

export default TodoController;
