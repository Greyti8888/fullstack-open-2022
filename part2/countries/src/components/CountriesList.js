const CountriesList = ({ countries }) => {
  const list = countries.map((countrie) => {
    const name = countrie.name.official
    return <div key={name}>{name}</div>
  })
  return list
}

export default CountriesList