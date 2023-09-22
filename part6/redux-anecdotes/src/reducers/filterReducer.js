const reducer = (state = '', action) => {
  switch (action.type) {
    case 'FILTER':
      return action.payload
    default:
      return state
  }
}

export const filter = (string) => {
  return {
    type: 'FILTER',
    payload: string.toLowerCase()
  }
}


export default reducer