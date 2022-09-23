const Header = ({ course }) => <h2>{course}</h2>

const Total = ({ parts }) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0)
  return <strong>total of {total} exercises</strong>
}

const Part = ({ part }) =>
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => {
  const formatedParts = parts.map(part => <Part key={part.id} part={part} />)
  return <>{formatedParts}</>
}

const Course = ({ courses }) => {
  const formatedCourses = courses.map(course => {
    const { id, name, parts } = course
    return (
      < div key={id}>
        <Header course={name} />
        <Content parts={parts} />
        <Total parts={parts} />
      </div >
    )
  })
  return (
    <>
      <h1>Web developer curriculum</h1>
      <div>{formatedCourses}</div>
    </>
  )
}

export default Course