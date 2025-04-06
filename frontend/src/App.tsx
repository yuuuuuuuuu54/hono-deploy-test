import { useState } from 'react'
import './App.css'
import { useGetTodos, usePostTodo } from './api/default/default';
import { useQueryClient } from '@tanstack/react-query';

function App() {
  const [newTodo, setNewTodo] = useState('')
  const queryClient = useQueryClient()

  const { data: todos } = useGetTodos()

  const postTodoMutation = usePostTodo()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    postTodoMutation.mutate({
      data: {
        title: newTodo,
        completed: false
      }
    }, {
      onSuccess: () => {
        setNewTodo('')
        queryClient.invalidateQueries({ queryKey: [`${import.meta.env.VITE_API_URL}/todos`] })
      }
    })
  }

  return (
    <div className="container">
      <h1>Todo App</h1>
      <form onSubmit={handleSubmit} className="todo-form">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="新しいTodoを入力"
          className="todo-input"
        />
        <button type="submit" className="add-button">追加</button>
      </form>
      <ul className="todo-list">
        {Array.isArray(todos?.data) && todos.data.map(todo => (
          <li key={todo.id} className="todo-item">
            <div className="todo-content">
              <span>{todo.title}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
