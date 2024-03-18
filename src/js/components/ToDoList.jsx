import React from "react";

const ToDoList = ({ tasks, onDeleteTask }) => {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          {task.text}{" "}
          <i className="fas fa-trash-alt" onClick={() => onDeleteTask(task.id)}></i>
        </li>
      ))}
    </ul>
  );
};

export default ToDoList;
