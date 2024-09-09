import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification} from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const handleAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(setNotification(`${content} was added`, 5))
        dispatch(createAnecdote(content))
      }
    
    return (
        <div>
            <h2>create new</h2>
            <form onSubmit = {handleAnecdote}>
            <div><input name= "anecdote"/></div>
            <button type='submit'>create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm