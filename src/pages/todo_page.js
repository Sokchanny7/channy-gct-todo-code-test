import React, { useEffect, useState } from 'react';
import AppConfig from '../config/app_config';
import _ from 'lodash';
import TodoList from '../components/todo_list';
const TodoPage = props => {
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
      <div>
        <div>
          <input type="text" onChage={setTodoText} value={todoText} />
        </div>
        <div>
          <button onClick={handleAdd}>Add</button>
        </div>
      </div>
    </div>
  );
};

export default TodoPage;
