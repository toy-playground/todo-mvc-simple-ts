import React, { createRef, useEffect, useState } from 'react'
import { useSetRecoilState } from 'recoil'
import { recoilState, Todo } from '../../todo'
import { UUID } from '../../util'

function NewInput() {
  const setAppState = useSetRecoilState(recoilState)
  const [inputValue, setInputValue] = useState('')
  const editRef = createRef<HTMLInputElement>()

  function addTodoItem(e: React.KeyboardEvent<HTMLInputElement>) {
    if (!inputValue.trim()) return

    if (e.key === 'Enter') {
      const todo: Todo = {
        id: UUID(),
        bodyText: inputValue,
        completed: false,
      }
      setAppState((old) => ({ todoList: [todo, ...old.todoList] }))

      setInputValue('')
    }
  }

  function onChange({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(value)
  }

  useEffect(() => {
    if (editRef.current) {
      editRef.current.focus()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <header className="header">
      <h1>todos</h1>
      <input
        ref={editRef}
        className="new-todo"
        placeholder="What needs to be done?"
        value={inputValue}
        onChange={onChange}
        onKeyPress={addTodoItem}
        data-testid="new-todo-input-text"
      />
    </header>
  )
}

export default NewInput
