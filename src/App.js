import React, { useState, useRef, useEffect } from 'react';
import ToDoList from './ToDoList';
import { v4 as uuidv4 } from 'uuid';

const LOCAL_TODO_STORAGE_KEY = 'todosStored'

export default function App() {
  const [todos, setTodos] = useState([])

  const todoNameRef = useRef()

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_TODO_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_TODO_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  const handleAddTodo = () => {
    if (todoNameRef.current.value === '') return
    const todo = { id: uuidv4(), name: todoNameRef.current.value, complete: false }
    setTodos(prevTodos => {
      return [...prevTodos, todo]
    })
    todoNameRef.current.value = null
  }

  const toggleTodo = (id) => {
    const todosNew = [...todos]
    const updatedTodo = todosNew.find(todo => todo.id === id)
    updatedTodo.complete = !updatedTodo.complete
    setTodos(todosNew)
  }

  const handleClearTodos = () => {
    const todosNew = todos.filter(todo => !todo.complete)
    setTodos(todosNew)
  }

  return (
    <>
      <ToDoList todos={todos} toggleTodo={toggleTodo} />
      <input ref={todoNameRef} type='text' />
      <button onClick={handleAddTodo}>Add Todo</button>
      <button onClick={handleClearTodos}>Clear completed</button>
      <p>{todos.length} todos left</p>
    </>
  )
}
