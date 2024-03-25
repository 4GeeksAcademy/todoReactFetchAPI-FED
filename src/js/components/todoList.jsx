import React, { useState } from "react";

const TodoList = () => {
  const [username, setUsername] = useState("");
  const [todoList, setTodoList] = useState([])
  const [newTodo, setNewTodo] = useState('')



  const deleteUser = () => {
    if(username !== '') {
      fetch(`https://playground.4geeks.com/apis/fake/todos/user/${username}`, {
        method: 'DELETE',
        headers: {
          "Content-Type": "application/json"
        }
      }).then(response=>{
        if(response.ok){
          return response.json()
        }
        throw Error(response.status + "! Something went wrong")
      }).then(()=> {
        // setTodoList(todoData);
        setUsername('')
        setTodoList([])
        setNewTodo('')
        alert('User is deleted now')
      }).catch(err=>{
        console.log('Error', err);
      })
    } else {
      alert('We cannot delete empty user')
    }

  };

  const createUser = () => {
    if(username !== '') {
      fetch(`https://playground.4geeks.com/apis/fake/todos/user/${username}`, {
        method: 'POST',
        body: JSON.stringify([]),
        headers: {
          "Content-Type": "application/json"
        }
      }).then(response=>{
        if(response.ok){
          return response.json()
        }
        throw Error(response.msg + "! Something went wrong")
      }).then(()=> {
        fetchTodoList()
      }).catch(err=>{
        if(response.status === 404) {
          createUser();
        }else{
          console.log(err);
        }
      })
    } else {
      alert('Can not create user for empty username')
    }

  };

  const fetchTodoList = () =>{
    console.log("fetch to do list for ", username);

    if(username !== '') {

      fetch(`https://playground.4geeks.com/apis/fake/todos/user/${username}`, {
          method: 'GET',
          headers: {
              "Content-Type": "application/json"
          }
      }).then(response => {
          if(response.ok) {
              return response.json()
          }
          if(response.status  === 404) {
            createUser();
            return
          }
          throw Error(response.status, "! Something Went Wrong")
      }).then((todoData) => {
          setTodoList(todoData);
      }).catch(err => {
          console.log(err)
      })
    } else {
      alert('Username cannot be empty')
    }
  }

  const addNewTodo = () => {
    console.log('Add this New to Do task to list', newTodo);

    if(username === ''){
      alert('Please add Username First')
      return
    }
 
      if(newTodo !== ''){
        const newTodoList = [... todoList, { done: false, label: newTodo }]

        fetch(`https://playground.4geeks.com/apis/fake/todos/user/${username}`, {
          method: 'PUT',
          body: JSON.stringify(newTodoList),
          headers: {
            "Content-Type": "application/json"
          }
        }).then(response => {
          if (response.ok) {
            return response.json()
          }
          throw Error(response.status + "! Something Went Wrong")
        }).then(() => {
          fetchTodoList();
          setNewTodo('')
        }).catch(err => {
          console.log('Error', err)
        })

      } else {
        alert('New Todo Task can not be empty')
      }
  }

  const deleteTodo = (id) => {
    const updatedTodo = todoList.filter(todo => todo.id !== id)

    fetch(`https://playground.4geeks.com/apis/fake/todos/user/${username}`, {
        method: 'PUT',
        body: JSON.stringify(updatedTodo),
        headers: {
          "Content-Type": "application/json"
        }
      }).then(response=>{
        if(response.ok){
          return response.json()
        }
        throw Error(response.status + "!Something Went Wrong")
      }).then(()=>{
        fetchTodoList();
        setNewTodo('')
      }).catch(err=>{
        console.log('Error', err);
      })

  }

  const handleTodoCheck = (id) => {
    const updatedTodoList = todoList.map(todo => {
      if (todo.id === id) {
        return { ...todo, done: !todo.done };
      }
      return todo;
    });
  
    fetch(`https://playground.4geeks.com/apis/fake/todos/user/${username}`, {
      method: 'PUT',
      body: JSON.stringify(updatedTodoList),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(response => {
      if (response.ok) {
        return response.json();
      }
      throw Error(response.status + "! Something Went Wrong");
    }).then(() => {
      fetchTodoList();
    }).catch(err => {
      console.log('Error', err);
    });
  };

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

        
        {username !== '' && (
          <div style={{ margin: 10}}>
            <input
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)} 
              placeholder='Enter your New Task' 
              onKeyDown={(e) => {
                if(e.key === "Enter") {
                  addNewTodo()
              }
            }}
            />
            <button onClick = {addNewTodo}>Add</button>
          </div>  
        )}

      <ul style={{ marginTop: 10 }}>
        {todoList !== undefined && todoList.map(todo => (
          <li key={todo.id}>
            <input 
              type='checkbox'
              checked={todo.done}
              onChange={() => handleTodoCheck(todo.id)} 
            />
            {todo.label}
            <i 
              className="fa fa-trash" 
              aria-hidden="true" 
              style={{ marginLeft: 5, cursor: 'pointer' }}
              onClick={() => deleteTodo(todo.id)}
            ></i>
          </li>
        ))}
      </ul>

    </div>

  );
};

export default TodoList;
