import ShowDetails from './CountriesList/ShowDetails'

const CountriesList = ({ countries, handleClick }) => {
  const list = countries.map((country, index) => {
    const name = country.name.common
    return <div key={name}>{name} <ShowDetails handleClick={handleClick} index={index} /></div>
  })
  return list
}

export default CountriesList