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

  const Button = ({ clickEvent, text }) => {
    return (
      <button onClick={clickEvent}>{text}</button>
    )
  }

  const StatisticLine = ({ text, value }) => {
    return (
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    )
  }

  const Statistics = ({ good, neutral, bad }) => {
    const totalFeedback = good + neutral + bad
    const average = totalFeedback === 0 ? 0 : (good - bad) / totalFeedback
    const positivePercentage = totalFeedback === 0 ? 0 : (good / totalFeedback) * 100

    if (totalFeedback === 0) {
      return (
        <div>
          <p>No feedback given</p>
        </div>
      )
    }

    return (
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={totalFeedback} />
          <StatisticLine text="average" value={average.toFixed(1)} />
          <StatisticLine text="positive" value={`${positivePercentage.toFixed(1)}%`} />
        </tbody>
      </table>
    )
  }

  return (
    <div>
      <h1>Give feedback</h1>
      <div>
        <Button clickEvent={handleGoodClick} text="good" />
        <Button clickEvent={handleNeutralClick} text="neutral" />
        <Button clickEvent={handleBadClick} text="bad" />
      </div>
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
