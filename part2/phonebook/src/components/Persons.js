import Person from "./Persons/Person"

const Persons = ({ persons, filter, handleDelete }) => {
  const output = persons.reduce((valid, person) => {
    const { name, number, id } = person
    const filterPassed = !filter || name.toLowerCase().includes(filter)
    if (filterPassed) valid.push(<Person key={name} name={name} number={number} id={id} handleDelete={handleDelete} />)
    return valid
  }, [])

  return (
    <div>
      {output}
    </div>
  )
}

export default Persons