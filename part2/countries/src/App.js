import { useState, useEffect } from 'react'
import axios from 'axios'

import Filter from './components/Filter'
import CountriesList from './components/CountriesList'
import CountrieDetails from './components/CountrieDetails';

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [filtered, setFiltered] = useState([])
  const [countrie, setCountrie] = useState()

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(res => setCountries(res.data))
  }, [])

  const handleFilter = (e) => {
    const newFilter = e.target.value.toLowerCase()
    let filteredCountries = []
    if (newFilter) {
      filteredCountries = countries.reduce((valid, countrie) => {
        const name = countrie.name.official
        const filterPassed = !newFilter || name.toLowerCase().includes(newFilter)
        if (filterPassed) valid.push(countrie)
        return valid
      }, [])
    }
    setFilter(newFilter)
    setFiltered(filteredCountries)
    filteredCountries.length === 1 ? setCountrie(filteredCountries[0]) : setCountrie(null)
  }

  const handleClick = (index) => {
    setCountrie(filtered[index])
  }

  return (
    <div>
      <Filter filter={filter} handleChange={handleFilter} />
      {countrie ? (
        <CountrieDetails countrie={countrie} />
      ) : filtered.length > 10 ? (
        <div>Too many matches, specify another filter</div>
      ) : (
        <CountriesList countries={filtered} handleClick={handleClick} />
      )}
    </div>
  );
}

export default App;