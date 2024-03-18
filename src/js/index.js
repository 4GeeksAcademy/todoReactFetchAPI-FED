import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import AddTaskInput from "./components/AddTaskInput.jsx";
import ToDoList from "./components/ToDoList.jsx";

const API_URL = "https://playground.4geeks.com/apis/fake/todos";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Failed to fetch tasks");
      }
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error.message);
    }
  };

  const addTask = async (text) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ label: text }),
      });
      if (!response.ok) {
        throw new Error("Failed to add task");
      }
      fetchTasks();
      setInputValue("");
    } catch (error) {
      console.error("Error adding task:", error.message);
    }
  };

  const deleteTask = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete task");
      }
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error.message);
    }
  };

  const getRemainingTasks = () => tasks.filter((task) => !task.done).length;

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <p>{getRemainingTasks()} tasks still to do</p>
      <AddTaskInput
        inputValue={inputValue}
        onAddTask={addTask}
        onInputChange={setInputValue}
        pendingTasks={getRemainingTasks()}
      />
      <ToDoList tasks={tasks} onDeleteTask={deleteTask} />
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("app")
);

export default App;
