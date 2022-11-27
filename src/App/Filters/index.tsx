import { NavLink } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { recoilState } from '../../todo'

const Filters: React.FC = () => {
  const [appState, setAppState] = useRecoilState(recoilState)

  const completedCount = appState.todoList.filter((t) => t.completed).length

  function clearCompletd() {
    const newVal = appState.todoList.filter((t) => !t.completed)
    setAppState({ todoList: newVal })
  }

  return (
    <footer className="footer">
      <span className="todo-count">
        <strong data-testid="todo-yet-left">{appState.todoList.length}</strong>{' '}
        items left
      </span>
      <ul className="filters">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? 'selected' : '')}
          >
            All
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/active"
            className={({ isActive }) => (isActive ? 'selected' : '')}
          >
            Active
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/completed"
            className={({ isActive }) => (isActive ? 'selected' : '')}
          >
            Completed
          </NavLink>
        </li>
      </ul>
      {completedCount > 0 && (
        <button className="clear-completed" onClick={clearCompletd}>
          Clear completed
        </button>
      )}
    </footer>
  )
}

export default Filters
