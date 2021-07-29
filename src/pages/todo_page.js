import React, { useEffect, useState, useRef } from 'react';
import AppConfig from '../config/app_config';
import _ from 'lodash';
import TodoList from '../components/todo_list';
import TodoController from '../components/todo_controller';
import moment from 'moment';
const TodoPage = props => {
  const inputRef = useRef(null);
  const [todoList, setTodoList] = useState([]);
  const [todoFilter, setTodoFilter] = useState([]);
  const [todoText, setTodoText] = useState();
  const [editItem, setEditItem] = useState();
  const [isDuplicate, setIsDuplicate] = useState(false);

  useEffect(() => {
    fetchTodoList();
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    if (todoList != undefined) {
      localStorage.setItem(
        AppConfig.MY_TODO_LIST_KEY,
        JSON.stringify(todoList)
      );
    }
  }, [todoList]);

  useEffect(() => {
    if (editItem == undefined && todoText) handleFilter();
  }, [todoText]);

  const fetchTodoList = () => {
    const object = localStorage.getItem(AppConfig.MY_TODO_LIST_KEY);
    if (object != undefined) setTodoList(JSON.parse(object));
  };

  const handleAdd = () => {
    if (todoText == undefined || todoText == '' || todoText == ' ') return;

    if (checkDuplicate()) return;

    if (editItem) {
      setTodoList([
        ...todoList.map(element => {
          if (editItem.id == element.id) {
            element.value = todoText;
          }
          return element;
        })
      ]);
      setEditItem(undefined);
    } else {
      setTodoList([
        {
          id: todoList != undefined ? todoList.length + 1 : 1,
          date: moment().format('MM-DD-YYYY hh:mm'),
          value: todoText.trim()
        },
        ...(todoList ?? [])
      ]);
    }
    setTodoText('');
  };

  const handleDelete = item => {
    setTodoList([
      ...todoList.filter(element => {
        if (item != element) return element;
      })
    ]);
  };

  const handleDeleteAll = () => {
    setTodoList([
      ...todoList.filter(element => {
        if (!element.completed) return element;
      })
    ]);
  };

  const handleEdit = item => {
    setEditItem(item);
    setTodoText(_.get(item, 'value'));
  };

  const handleSingleClick = index => {
    todoList[index].completed = !todoList[index].completed;
    setTodoList([...todoList]);
  };

  const handleCompletAll = () => {
    var isSelectedAll = false;
    for (var i = 0; i < todoList.length; i++) {
      if (!todoList[i].completed) {
        isSelectedAll = true;
        break;
      }
    }
    setTodoList([
      ...todoList.map(element => {
        element.completed = isSelectedAll;
        return element;
      })
    ]);
  };

  const handleFilter = () => {
    if (isDuplicate) setIsDuplicate(false);
    const list = todoList.filter(element => {
      if (
        _.get(element, 'value', '')
          .toLowerCase()
          .includes(todoText.toLowerCase())
      ) {
        return element;
      }
    });
    setTodoFilter(list);
  };

  const checkDuplicate = () => {
    if (todoList == undefined) return false;
    const list = todoList.filter(element => {
      if (
        todoText.trim().toLowerCase() ==
          _.get(element, 'value', '')
            .trim()
            .toLowerCase() &&
        todoText.trim().toLowerCase() !=
          _.get(editItem, 'value', '')
            .trim()
            .toLowerCase()
      )
        return element;
    });
    const value = list.length > 0;
    setIsDuplicate(value);
    return value;
  };

  const handleCancel = () => {
    setTodoText('');
    setEditItem(undefined);
  };

  return (
    <div className="content">
      <TodoList
        isEmpty={
          editItem == undefined &&
          todoText != undefined &&
          todoText != '' &&
          todoFilter.length <= 0
        }
        todoList={
          editItem == undefined && todoText != undefined && todoText != ''
            ? todoFilter
            : todoList
        }
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        handleSingleClick={handleSingleClick}
        handleCompletAll={handleCompletAll}
        handleDeleteAll={handleDeleteAll}
      />
      <TodoController
        disabled={todoText == undefined || todoText == ''}
        isEdit={editItem != undefined}
        handleAdd={handleAdd}
        handleCancel={handleCancel}
        inputRef={inputRef}
        onChange={setTodoText}
        value={todoText}
        isDuplicate={isDuplicate}
        isEmpty={
          editItem == undefined &&
          todoText != undefined &&
          todoText != '' &&
          todoFilter.length <= 0
        }
      />
    </div>
  );
};

export default TodoPage;
