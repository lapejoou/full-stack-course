import { useState } from 'react'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  const Statistics = (props) => {
    const totalFeedback = props.good + props.neutral + props.bad
    const average = totalFeedback === 0 ? 0 : (props.good - props.bad) / totalFeedback
    const positivePercentage = totalFeedback === 0 ? 0 : (good / totalFeedback) * 100

    if (props.good === 0 && props.bad === 0 && props.neutral === 0) {
      return (
        <div>
          <p>No feedback given</p>
        </div>
      )
    }
    return (
      <div>
        <p>All: {totalFeedback}</p>
        <p>Average: {average}</p>
        <p>Positive: {positivePercentage}%</p>
      </div>
    )
  }

  return (
    <div>
      <h1>Give feedback</h1>
      <div>
        <button onClick={handleGoodClick}>good</button>
        <button onClick={handleNeutralClick}>neutral</button>
        <button onClick={handleBadClick}>bad</button>
      </div>
      <h1>Statistics</h1>
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
