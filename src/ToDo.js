import React from 'react'

export default function ToDo({ todo, toggleTodo }) {
    const handleToggleClick = () => {
        toggleTodo(todo.id)
    }

    return (
        <div>
            <label>{todo.name}</label>
            <input type="checkbox" defaultChecked={todo.complete} onChange={handleToggleClick}/>
        </div>
    )
}
