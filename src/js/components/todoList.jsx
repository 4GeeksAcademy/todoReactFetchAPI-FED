import React, { useState } from "react";

const TodoList = () => {
  const [username, setUsername] = useState("");
  const [todoList, setTodoList] = useState([])
  const [newTodo, setNewTodo] = useState('')



  const deleteUser = () => {
    console.log("Delete This User", username);
  };

  const fetchTodoList = () =>{
    console.log("fetch to do list for ", username);

    fetch(`https://playground.4geeks.com/apis/fake/todos/user/${username}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    }).then(response => {
        if(response.ok) {
            return response.json()
        }
        throw Error(response.status, "! Something Went Wrong")
    }).then((todoData) => {
        setTodoList(todoData);
    }).catch(err => {
        console.log('Error', err)
    })
  }

  const addNewTodo = () => {
    console.log('Add this New to Do task to list', newTodo)
  }



  return (
    <div>
        <div>
            <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your Username"
                onKeyDown={(e) => {
                if (e.key === "Enter") {
                    fetchTodoList();
                }
                }}
            />
            <button onClick={deleteUser}>Delete User</button>
        </div>

        <div style={{ margin: 10 }} >
            <input
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="Enter your New Task"
                onKeyDown={(e) => {
                if (e.key === "Enter") {
                    addNewTodo()
                }
                }}
            />
            <button onClick={addNewTodo}>Add</button>
        </div>
            

      <ul style={{ marginTop:10}}>
        {todoList.map(todo => {
            return <li key={todo.id}>{todo.label}
            <i class="fa fa-trash" aria-hidden="true" style={{ marginLeft: 5, cursor: 'pointer' }}></i>

            </li>
        })}
      </ul>
    </div>

  );
};

export default TodoList;
