const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'CREATE':
      return `new anecdote "${action.payload}"`
    case 'VOTE':
      return `you voted "${action.payload}"`
    case 'CLEAR':
      return ''
    default:
      return ''
  }
}

export default notificationReducer