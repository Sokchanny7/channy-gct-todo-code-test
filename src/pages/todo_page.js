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
    setTodoList([
      ...(todoList ?? []),
      {
        id: todoList != undefined ? todoList.length + 1 : 1,
        date: moment().format('MM-DD-YYYY hh:mm'),
        value: todoText
      }
    ]);
  };

  return (
    <div className="content">
      <TodoList todoList={todoList} />
      <TodoController
        handleAdd={handleAdd}
        inputRef={inputRef}
        onChange={setTodoText}
        value={todoText}
      />
    </div>
  );
};

export default TodoPage;
