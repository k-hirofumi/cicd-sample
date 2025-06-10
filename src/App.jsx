import { useState } from 'react'
import './App.css'

function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'ReactのサンプルToDoアプリを作成', completed: true },
    { id: 2, text: 'Viteを使ってプロジェクトをセットアップ', completed: true },
    { id: 3, text: 'ローカルサーバーで動作確認', completed: false }
  ])
  const [inputValue, setInputValue] = useState('')

  const addTodo = () => {
    if (inputValue.trim() !== '') {
      const newTodo = {
        id: Date.now(),
        text: inputValue,
        completed: false
      }
      setTodos([...todos, newTodo])
      setInputValue('')
    }
  }

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const completedCount = todos.filter(todo => todo.completed).length

  return (
    <div className="app">
      <div className="container">
        <h1>📝 React ToDo アプリ</h1>
        <div className="stats">
          <p>完了: {completedCount} / {todos.length}</p>
        </div>
        
        <div className="input-section">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTodo()}
            placeholder="新しいタスクを入力..."
            className="todo-input"
          />
          <button onClick={addTodo} className="add-btn">
            追加
          </button>
        </div>

        <div className="todos-list">
          {todos.map(todo => (
            <div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
              <div className="todo-content">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                  className="todo-checkbox"
                />
                <span className="todo-text">{todo.text}</span>
              </div>
              <button 
                onClick={() => deleteTodo(todo.id)} 
                className="delete-btn"
              >
                🗑️
              </button>
            </div>
          ))}
        </div>

        {todos.length === 0 && (
          <div className="empty-state">
            <p>タスクがありません。新しいタスクを追加してください！</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
