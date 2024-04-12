import { CoursePart } from "../types";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`,
  );
};

const Part = (props: CoursePart) => {
  switch (props.kind) {
    case "basic":
      return (
        <div>
          <strong>
            {props.name}: {props.exerciseCount}
          </strong>
          <br />
          <i>{props.description}</i>
        </div>
      );
    case "group":
      return (
        <div>
          <strong>
            {props.name}: {props.exerciseCount}
          </strong>
          <br />
          group projects: {props.groupProjectCount}
        </div>
      );
    case "background":
      return (
        <div>
          <strong>
            {props.name}: {props.exerciseCount}
          </strong>
          <br />
          <i>{props.description}</i>
          <br />
          {props.backgroundMaterial}
        </div>
      );
    case "special":
      return (
        <div>
          <strong>
            {props.name}: {props.exerciseCount}
          </strong>
          <br />
          <i>{props.description}</i>
          <br />
          required skills: {props.requirements.join(", ")}
        </div>
      );
    default:
      assertNever(props);
  }
};

export default Part;
