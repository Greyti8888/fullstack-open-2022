import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

import { Button } from '@mui/material'

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  Togglable.displayName = 'Togglable'

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  const btnMargin = { marginBottom: '15px' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button
          style={btnMargin}
          variant='contained'
          onClick={toggleVisibility}
        >
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button
          color='error'
          style={btnMargin}
          fullWidth={true}
          variant='contained'
          onClick={toggleVisibility}
        >
          cancel
        </Button>
      </div>
    </div>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable
