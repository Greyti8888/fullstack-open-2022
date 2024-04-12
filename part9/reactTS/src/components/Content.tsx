import Part from "./Part";

import { CoursePart } from "../types";

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  const parts = courseParts.map((part) => <Part key={part.name} {...part} />);
  return parts;
};

export default Content;
