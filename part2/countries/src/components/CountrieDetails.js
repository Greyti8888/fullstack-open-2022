import Languages from './CountrieDetails/Languages';

const CountrieDetails = ({ countrie }) => {
  return (
    <div>
      <h1>{countrie.name.common}</h1>
      <div>capital: {countrie.capital}</div>
      <div>area: {countrie.area}</div>
      <h2>languages:</h2>
      <Languages languages={countrie.languages} />
      <img src={countrie.flags.png} alt="countrie flag"></img>
    </div>
  )
}

export default CountrieDetails