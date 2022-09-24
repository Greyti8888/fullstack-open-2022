import { useState, useEffect } from 'react'
import axios from 'axios'

import Filter from './components/Filter'
import CountriesList from './components/CountriesList'
import CountrieDetails from './components/CountrieDetails';

const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [filtered, setFiltered] = useState([])
  const [country, setCountry] = useState()
  const [countryWeather, setCountryWeather] = useState()

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(res => setCountries(res.data))
  }, [])

  /*useEffect(() => {
    console.log('Start')
    if (countrie) {
      console.log('Getting weather...')
      const [lat, lon] = countrie.latlng
      axios
        .get(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily,alerts&appid=${WEATHER_API_KEY}`)
        .then(res => setCountrieWeather(res.data))
    }
    console.log('Done')
  }, [countrie])*/

  const handleFilter = async (e) => {
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
    if (filteredCountries.length === 1) {
      const country = filteredCountries[0]
      const weather = await axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]},${country.cca2}&units=metric&appid=${WEATHER_API_KEY}`)
        .then(res => res.data)
      setCountry(country)
      setCountryWeather(weather)
    } else {
      setCountry(null)
      setCountryWeather(null)
    }
  }

  const handleClick = async (index) => {
    const country = filtered[index]
    const weather = await axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital[0]},${country.cca2}&units=metric&appid=${WEATHER_API_KEY}`)
      .then(res => res.data)
    setCountry(country)
    setCountryWeather(weather)
  }

  return (
    <div>
      <Filter filter={filter} handleChange={handleFilter} />
      {(country && countryWeather) ? (
        <CountrieDetails country={country} weather={countryWeather} />
      ) : filtered.length > 10 ? (
        <div>Too many matches, specify another filter</div>
      ) : (
        <CountriesList countries={filtered} handleClick={handleClick} />
      )}
    </div>
  );
}

export default App;