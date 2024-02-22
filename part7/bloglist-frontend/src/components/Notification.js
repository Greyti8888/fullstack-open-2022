import PropTypes from 'prop-types'

import { Alert } from '@mui/material'

const Notification = ({ message, type }) => (
  <Alert style={{ marginBottom: '10px' }} severity={type}>
    {message}
  </Alert>
)

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
}

export default Notification
