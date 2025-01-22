import React, { useState } from "react";
import "./App.css";
import { FaSearch } from "react-icons/fa";


function App() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  const [search, setSearch] = useState("");
  const [searchVisible, setSearchVisible] = useState(false);

  const handleInputChange = (e) => setTask(e.target.value);

  const handleAddTask = () => {
    if (task.trim()) {
      setTodos([...todos, { id: Date.now(), task, completed: false }]);
      setTask("");
    }
  };

  const handleDeleteTask = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleToggleCompletion = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleSearchChange = (e) => setSearch(e.target.value);

  const filteredTodos = todos.filter((todo) =>
    todo.task.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="App">
      <div className="todo-container">
        <h1 className="app-title">To-Do App</h1>

        <div className="input-container">
          <input
            type="text"
            value={task}
            onChange={handleInputChange}
            placeholder="Add a new task"
            className="task-input"
          />
          <button onClick={handleAddTask} className="add-button">
            Add Task
          </button>
        </div>

        <div className="search-container">
          <FaSearch
            className="search-icon"
            onClick={() => setSearchVisible(!searchVisible)}
          />
          {searchVisible && (
            <input
              type="text"
              placeholder="Search tasks..."
              value={search}
              onChange={handleSearchChange}
              className="search-input"
            />
          )}
        </div>

        <ul className="todo-list">
          {filteredTodos.map((todo) => (
            <li
              key={todo.id}
              className={todo.completed ? "todo-item completed" : "todo-item"}
            >
              <span
                onClick={() => handleToggleCompletion(todo.id)}
                className="task-text"
              >
                {todo.task}
              </span>
              <button
                className="delete-button"
                onClick={() => handleDeleteTask(todo.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
