import { atom, RecoilState } from 'recoil'

export interface Todo {
  id: string
  bodyText: string
  completed: boolean
}

export type TodoList = Todo[]

export interface AppState {
  todoList: TodoList
}

export const APP_STATE_KEY = 'TODO_LIST_STATE'

function loadFromLocalStorage(): AppState {
  const data = localStorage.getItem(APP_STATE_KEY)

  return { todoList: data ? JSON.parse(data) : [] }
}

export const recoilState: RecoilState<AppState> = atom({
  key: APP_STATE_KEY,
  default: loadFromLocalStorage(),
})
