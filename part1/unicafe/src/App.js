import { useState } from 'react'

const Header = ({ text }) => <h1>{text}</h1>
const Button = ({ text, handleClick }) => <button onClick={handleClick(text)}>{text}</button>
const Stats = ({ text, value }) => <div>{text} {value}</div>

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [avg, setAvg] = useState(0)
  const [positive, setPositive] = useState(0)

  const calcAvg = (good, bad, all) => (good * 1 + bad * -1) / all
  const calcPositive = (good, all) => (good / all) * 100

  const handleClick = (key) => {
    return () => {
      let newValue
      let newAvg
      let newAll = all + 1
      let newPositive
      setAll(newAll)
      if (key === 'good') {
        newValue = good + 1
        setGood(newValue)
        newAvg = calcAvg(newValue, bad, newAll)
        newPositive = calcPositive(newValue, newAll)
      }
      if (key === 'neutral') {
        newValue = neutral + 1
        setNeutral(newValue)
        newAvg = calcAvg(good, bad, newAll)
        newPositive = calcPositive(good, newAll)
      }
      if (key === 'bad') {
        newValue = bad + 1
        setBad(newValue)
        newAvg = calcAvg(good, newValue, newAll)
        newPositive = calcPositive(good, newAll)
      }
      setAvg(newAvg)
      setPositive(newPositive)
    }
  }

  return (
    <div>
      <Header text={'give feedback'} />
      <Button text={'good'} handleClick={handleClick} />
      <Button text={'neutral'} handleClick={handleClick} />
      <Button text={'bad'} handleClick={handleClick} />
      <Header text={'statistics'} />
      <Stats text={'good'} value={good} />
      <Stats text={'neutral'} value={neutral} />
      <Stats text={'bad'} value={bad} />
      <Stats text={'all'} value={all} />
      <Stats text={'average'} value={avg} />
      <Stats text={'positive'} value={positive} />
    </div>
  )
}

export default App