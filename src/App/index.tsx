import { useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import { APP_STATE_KEY, recoilState } from '../todo'
import Copyright from './Copyright'
import Filters from './Filters'
import NewInput from './NewInput'
import TodoList from './TodoList'

const App: React.FC = () => {
  const appState = useRecoilValue(recoilState)

  useEffect(() => {
    localStorage.setItem(APP_STATE_KEY, JSON.stringify(appState.todoList))
  }, [appState.todoList])

  return (
    <>
      <section className="todoapp">
        <NewInput />
        <TodoList />
        <Filters />
      </section>
      <Copyright />
    </>
  )
}

export default App
