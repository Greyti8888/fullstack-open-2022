import { useState } from 'react'

const Header = ({ text }) => <h1>{text}</h1>
const Button = ({ text, handleClick }) => <button onClick={handleClick(text)}>{text}</button>
const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({ data }) => {
  const { good, neutral, bad, all, avg, positive } = data
  if (all === 0) return <p>No feedback given</p>
  else return (
    <table>
      <tbody>
        <StatisticLine text={'good'} value={good} />
        <StatisticLine text={'neutral'} value={neutral} />
        <StatisticLine text={'bad'} value={bad} />
        <StatisticLine text={'all'} value={all} />
        <StatisticLine text={'average'} value={avg} />
        <StatisticLine text={'positive'} value={positive} />
      </tbody>
    </table>
  )

}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [avg, setAvg] = useState(0)
  const [positive, setPositive] = useState(0)

  const data = { good, neutral, bad, all, avg, positive }

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
      <Statistics data={data} />
    </div>
  )
}

export default App