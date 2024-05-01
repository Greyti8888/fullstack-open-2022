import { createContext } from "react";
import { Diagnosis } from "../../types";

const DiagnosesContext = createContext<Diagnosis[] | undefined>(undefined);

export default DiagnosesContext;
