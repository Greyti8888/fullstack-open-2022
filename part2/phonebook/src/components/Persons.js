import Person from "./Persons/Person"

const Persons = ({ persons, filter }) => {
  const output = persons.reduce((valid, person) => {
    const { name, number } = person
    const filterPassed = !filter || name.toLowerCase().includes(filter)
    if (filterPassed) valid.push(<Person key={name} name={name} number={number} />)
    return valid
  }, [])

  return (
    <div>
      {output}
    </div>
  )
}

export default Persons