import { useSelector } from "react-redux"

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const style = {
    border: 'solid',
    padding: 10,
    margin: '10px 0px',
    borderWidth: 1
  }

  if (notification) {
    return (
      <div style={style}>
        {notification}
      </div>
    )
  } else return

}

export default Notification