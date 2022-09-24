const Filter = ({ filter, handleChange }) => {
  return (
    <div>
      find coutries <input value={filter} onChange={handleChange} />
    </div>
  )
}

export default Filter