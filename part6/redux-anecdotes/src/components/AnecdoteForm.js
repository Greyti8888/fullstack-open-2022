const AnecdoteForm = ({ handleCreate }) => {
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreate}>
        <div><input name='anecdote' /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm