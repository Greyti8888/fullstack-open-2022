type Part = {
  name: string;
  exerciseCount: number;
};

type courseParts = {
  courseParts: Part[];
};

const Content = (props: courseParts) => {
  const parts = props.courseParts.map((part) => {
    return (
      <p>
        {part.name}: {part.exerciseCount}
      </p>
    );
  });
  return parts;
};

export default Content;
