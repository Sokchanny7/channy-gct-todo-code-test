import React, { useEffect, useState, useRef } from 'react';
import AppConfig from '../config/app_config';
import _ from 'lodash';
import TodoList from '../components/todo_list';
import TodoController from '../components/todo_controller';
const TodoPage = props => {
  const inputRef = useRef(null);
  const [todoList, setTodoList] = useState([]);
  const [todoText, setTodoText] = useState();

  useEffect(() => {
    fetchTodoList();
  }, []);

  const fetchTodoList = () => {
    const list = localStorage.getItem(AppConfig.MY_TODO_LIST_KEY);
    console.log('>list', list);
    // if (list != undefined && list.length > 0) setTodoList(list);
  };

  const handleAdd = () => {
    localStorage.setItem(AppConfig.MY_TODO_LIST_KEY, [...todoList, todoText]);
  };

  return (
    <div>
      <TodoList todoList={todoList} />
      <TodoController inputRef={inputRef} />
    </div>
  );
};

export default TodoPage;
