import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const dispatch = useDispatch()

	const anecdotes = useSelector((state) => {
		const anecdotes = state.anecdotes;
		const filter = state.filter;
		return [...anecdotes]
			.sort((a, b) => b.votes - a.votes)
			.filter((anecdote) => anecdote.content.includes(filter));
	});

    const handleVote = (id) => {
        const votedAnecdote = anecdotes.find((anecdote) => anecdote.id === id)
        dispatch(setNotification(`you voted ${votedAnecdote.content}`, 5))
        dispatch(voteAnecdote(id))
      }

    return (
        <div>
        <h2>Anecdotes</h2>
        {anecdotes.map((anecdote) => (
            <div key={anecdote.id}>
                <div>
                {anecdote.content}
                </div>
                <div>
                has {anecdote.votes}
                <button onClick={() => handleVote(anecdote.id)}>vote</button>
                </div>
            </div>
            ))}
        </div>
)
}

export default AnecdoteList