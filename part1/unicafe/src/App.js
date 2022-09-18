import { useState } from 'react'

const Header = ({ text }) => <h1>{text}</h1>
const Button = ({ text, handleClick }) => <button onClick={handleClick}>{text}</button>
const Display = ({ good, neutral, bad }) => (
  <>
    <Count text={'good'} value={good} />
    <Count text={'neutral'} value={neutral} />
    <Count text={'bad'} value={bad} />
  </>
)
const Count = ({ text, value }) => <div>{text} {value}</div>

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => setGood(good + 1)
  const handleNeutralClick = () => setNeutral(neutral + 1)
  const handleBadClick = () => setBad(bad + 1)

  return (
    <div>
      <Header text={'give feedback'} />
      <Button text={'good'} handleClick={handleGoodClick} />
      <Button text={'neutral'} handleClick={handleNeutralClick} />
      <Button text={'bad'} handleClick={handleBadClick} />
      <Header text={'statistics'} />
      <Display good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App