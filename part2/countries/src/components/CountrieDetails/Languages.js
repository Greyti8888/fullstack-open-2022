const Languages = ({ languages }) => {
  const list = []
  for (const language in languages) {
    list.push(<li key={language}>{languages[language]}</li>)
  }
  return <ul>{list}</ul>
}

export default Languages