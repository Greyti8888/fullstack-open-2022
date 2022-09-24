import Languages from './CountrieDetails/Languages';

const CountrieDetails = ({ country, weather }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>capital: {country.capital[0]}</div>
      <div>area: {country.area}</div>
      <h2>languages:</h2>
      <Languages languages={country.languages} />
      <img width={150} src={country.flags.png} alt="country flag" />
      <h2>Weather in {country.capital}</h2>
      <div>temperature: {weather.main.temp} Celcius</div>
      <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather icon" />
      <div>wind: {weather.wind.speed} m/s</div>
    </div>
  )
}

export default CountrieDetails