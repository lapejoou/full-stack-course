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

  const Button = ({clickEvent, text}) => {
    return (
    <button onClick={clickEvent}>{text}</button>
    )
  }

  const StatisticLine = ({ text, value }) => {
    return (
      <p>{text}: {value}</p>
    )
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
        <StatisticLine text="good" value ={props.good} />
        <StatisticLine text="neutral" value ={props.neutral} />
        <StatisticLine text="bad" value ={props.bad} />
        <StatisticLine text="all" value ={totalFeedback} />
        <StatisticLine text="average" value ={average} />
        <StatisticLine text="positive" value ={positivePercentage} />
      </div>
    )
  }

  return (
    <div>
      <h1>Give feedback</h1>
      <div>
        <Button clickEvent = {handleGoodClick} text ="good"/>
        <Button clickEvent = {handleNeutralClick} text ="neutral"/>
        <Button clickEvent = {handleBadClick} text ="bad"/>
      </div>
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
