import React, { useCallback, useEffect } from 'react';
import _ from 'lodash';
const TodoController = props => {
  const keyPressFunction = useCallback(
    event => {
      if (event.keyCode === 13) {
        if (!_.get(props, 'disabled')) props.handleAdd && props.handleAdd();
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
    <div>
      {_.get(props, 'isDuplicate') == true && (
        <div>
          <i className={'text-error'}>
            {_.get(props, 'value')} already has in todo list!!
          </i>
        </div>
      )}

      {_.get(props, 'isEmpty') == true && (
        <div>
          <i className={'text-error'}>Empty list</i>
        </div>
      )}

      <div className="todo-controller">
        {_.get(props, 'isEdit') && (
          <div className="w-20">
            <button
              className="cancel-button"
              onClick={() => {
                props.handleCancel && props.handleCancel();
              }}
            >
              Cancel
            </button>
          </div>
        )}
        <div className={`${_.get(props, 'isEdit') ? 'w-60' : 'w-80'}`}>
          <input
            className={`${_.get(props, 'isEdit') ? 'w-60' : 'w-80'}`}
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
    </div>
  );
};

export default TodoController;
