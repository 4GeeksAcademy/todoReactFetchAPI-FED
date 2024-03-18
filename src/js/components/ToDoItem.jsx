import React from 'react';

const ToDoItem = ({ task, onDeleteTask }) => (
  <li className="todo-item">
    {task.label}
    <button onClick={() => onDeleteTask(task.id)}>Delete</button>
  </li>
);

export default ToDoItem;
