import React, { useState, useEffect, createRef } from 'react'
import { useRecoilState } from 'recoil'
import { recoilState, Todo } from '../../../todo'

interface Props {
  todo: Todo
}

const Item: React.FC<Props> = ({ todo }) => {
  const [appState, setAppState] = useRecoilState(recoilState)
  const [state, setState] = useState({ onEdit: false })
  const editRef = createRef<HTMLInputElement>()

  function reverseChecked(id: Todo['id']) {
    const newVal = appState.todoList.map((t) =>
      t.id === id ? { ...t, completed: !t.completed } : t
    )
    setAppState({ todoList: newVal })
  }

  function deleteTodo(id: Todo['id']) {
    const newVal = appState.todoList.filter((t: Todo) => t.id !== id)
    setAppState({ todoList: newVal })
  }

  function handleTodoTextEdit(
    { target: { value } }: React.ChangeEvent<HTMLInputElement>,
    id: Todo['id']
  ) {
    const newVal = appState.todoList.map((t) =>
      t.id === id ? { ...t, bodyText: value } : t
    )

    setAppState({ todoList: newVal })
  }

  function submitEditText(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      setState({ onEdit: false })
    }
  }

  useEffect(() => {
    if (state.onEdit === true && editRef.current !== null) {
      editRef.current.focus()
      const value = editRef.current.value
      editRef.current.setSelectionRange(value.length, value.length)
    }
  }, [editRef, state.onEdit])

  return todo ? (
    <li
      className={`todo ${todo.completed ? 'completed' : ''} ${
        state.onEdit ? 'editing' : ''
      }`}
    >
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={todo.completed}
          onChange={() => reverseChecked(todo.id)}
        />
        <label
          data-testid="todo-body-text"
          onDoubleClick={() => setState({ onEdit: true })}
        >
          {todo.bodyText}
        </label>
        <button className="destroy" onClick={() => deleteTodo(todo.id)} />
      </div>
      <input
        ref={editRef}
        className="edit"
        type="text"
        value={todo.bodyText}
        onChange={(e) => handleTodoTextEdit(e, todo.id)}
        onKeyDown={(e) => submitEditText(e)}
        onBlur={() => setState({ onEdit: false })}
        data-testid="todo-edit-input"
      />
    </li>
  ) : null
}

export default Item
