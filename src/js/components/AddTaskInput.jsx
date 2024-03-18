import React from 'react';

const AddTaskInput = ({ inputValue, onAddTask, onInputChange }) => (
  <div className="todo-input">
    <input
      type="text"
      value={inputValue}
      onChange={(e) => onInputChange(e.target.value)}
      onKeyPress={(e) => (e.key === 'Enter' ? onAddTask(inputValue) : null)}
      placeholder="Add a new task..."
    />
    <button onClick={() => onAddTask(inputValue)}>Add Task</button>
  </div>
);

export default AddTaskInput;
