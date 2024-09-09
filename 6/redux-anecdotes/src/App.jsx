import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { initializedAnecdotes } from './reducers/anecdoteReducer'

const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializedAnecdotes()) 
  }, [dispatch]) 

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification/>
      <Filter />
      <AnecdoteForm />
      <AnecdoteList />
    </div>
  )
}

export default App