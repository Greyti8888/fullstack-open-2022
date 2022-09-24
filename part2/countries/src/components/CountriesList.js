import ShowDetails from './CountriesList/ShowDetails'

const CountriesList = ({ countries, handleClick }) => {
  const list = countries.map((countrie, index) => {
    const name = countrie.name.common
    return <div key={name}>{name} <ShowDetails handleClick={handleClick} index={index} /></div>
  })
  return list
}

export default CountriesList