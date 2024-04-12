type TotalExercises = {
  total: number;
};

const Total = (props: TotalExercises) => {
  return <p>Number of exercises {props.total}</p>;
};

export default Total;
