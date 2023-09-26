const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'CREATE':
      return `new anecdote "${action.payload}"`
    case 'VOTE':
      return `you voted "${action.payload}"`
    case 'CLEAR':
      return ''
    case 'ERROR':
      return action.payload
    default:
      return ''
  }
}

export default notificationReducer