import { useNotificationValue, useNotificationDispatch } from "../NotificationContext"

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }

  const notification = useNotificationValue()
  const notificationDispatch = useNotificationDispatch()


  if (notification) {
    setTimeout(() => notificationDispatch({ type: 'CLEAR' }), 5000)
    return (
      <div style={style}>
        {notification}
      </div>
    )
  } else return null

}

export default Notification
