import { useDispatch } from 'react-redux'
import { filter } from '../reducers/filterReducer'


const Filter = () => {
  const dispatch = useDispatch()

  const handleChange = (e) => {
    // input-field value is in variable event.target.value
    dispatch(filter(e.target.value))
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter