import { useSelector, useDispatch } from "react-redux"
import { removeNotification } from "../reducers/notificationReducer"

let timer

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const dispatch = useDispatch()
  const style = {
    border: 'solid',
    padding: 10,
    margin: '10px 0px',
    borderWidth: 1
  }

  if (notification) {
    clearTimeout(timer)
    timer = setTimeout(() => dispatch(removeNotification()), 5000)
    return (
      <div style={style}>
        {notification}
      </div>
    )
  } else return

}

export default Notification