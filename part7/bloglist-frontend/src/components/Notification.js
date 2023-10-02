import PropTypes from 'prop-types'

const Notification = ({ message }) => (
  <div
    style={{
      border: 'solid black',
      padding: '5px',
      backgroundColor: 'lightgrey',
    }}
  >
    <h3>{message}</h3>
  </div>
)

Notification.propTypes = {
  message: PropTypes.string.isRequired,
}

export default Notification
