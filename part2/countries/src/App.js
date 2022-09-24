import { useState, useEffect } from 'react'
import axios from 'axios'

import Filter from './components/Filter'
import CountriesList from './components/CountriesList'
import CountrieDetails from './components/CountrieDetails';

const App = () => {
  const [countries, setCoutries] = useState([])
  const [filter, setFilter] = useState('')
  const [filtered, setFiltered] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(res => setCoutries(res.data))
  }, [])

  const handleFilter = (e) => {
    const newFilter = e.target.value.toLowerCase()
    const filteredCountries = countries.reduce((valid, countrie) => {
      const name = countrie.name.official
      const filterPassed = !newFilter || name.toLowerCase().includes(newFilter)
      if (filterPassed) valid.push(countrie)
      return valid
    }, [])
    setFilter(newFilter)
    setFiltered(filteredCountries)
  }

  return (
    <div>
      <Filter filter={filter} handleChange={handleFilter} />
      {filtered.length === 1 ? (
        <CountrieDetails countrie={filtered[0]} />
      ) : filtered.length > 10 ? (
        <div>Too many matches, specify another filter</div>
      ) : (
        <CountriesList countries={filtered} />
      )}
    </div>
  );
}

export default App;