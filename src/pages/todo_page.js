import React, { useEffect, useState, useRef } from 'react';
import AppConfig from '../config/app_config';
import _ from 'lodash';
import TodoList from '../components/todo_list';
import TodoController from '../components/todo_controller';
import moment from 'moment';
const TodoPage = props => {
  const inputRef = useRef(null);
  const [todoList, setTodoList] = useState([]);
  const [todoText, setTodoText] = useState();
  const [editItem, setEditItem] = useState();

  useEffect(() => {
    fetchTodoList();
    // inputRef.current.focus();
  }, []);

  useEffect(() => {
    if (todoList != undefined) {
      localStorage.setItem(
        AppConfig.MY_TODO_LIST_KEY,
        JSON.stringify(todoList)
      );
    }
  }, [todoList]);

  const fetchTodoList = () => {
    const object = localStorage.getItem(AppConfig.MY_TODO_LIST_KEY);
    if (object != undefined) setTodoList(JSON.parse(object));
  };

  const handleAdd = () => {
    if (todoText == undefined || todoText == '') return;
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
        ...(todoList ?? []),
        {
          id: todoList != undefined ? todoList.length + 1 : 1,
          date: moment().format('MM-DD-YYYY hh:mm'),
          value: todoText
        }
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

  const handleEdit = item => {
    setEditItem(item);
    setTodoText(_.get(item, 'value'));
  };

  return (
    <div className="content">
      <TodoList
        todoList={todoList}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
      <TodoController
        disabled={todoText == undefined || todoText == ''}
        isEdit={editItem != undefined}
        handleAdd={handleAdd}
        inputRef={inputRef}
        onChange={setTodoText}
        value={todoText}
      />
    </div>
  );
};

export default TodoPage;
