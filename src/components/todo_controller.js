import React, { useCallback, useEffect } from 'react';
import _ from 'lodash';
const TodoController = props => {
  const keyPressFunction = useCallback(
    event => {
      if (event.keyCode === 13) {
        props.handleAdd && props.handleAdd();
      }
    },
    [props]
  );

  useEffect(() => {
    document.addEventListener('keydown', keyPressFunction, false);
    return () => {
      document.removeEventListener('keydown', keyPressFunction, false);
    };
  }, [keyPressFunction]);

  return (
    <div className="todo-controller">
      <div className="w-80">
        <input
          placeholder="What's todo?"
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
          disabled={_.get(props, 'disabled')}
          onClick={() => {
            props.handleAdd && props.handleAdd();
          }}
        >
          {_.get(props, 'isEdit') ? 'Update' : 'Add'}
        </button>
      </div>
    </div>
  );
};

export default TodoController;
