import { UseFormRegister } from "react-hook-form";
import { TextField } from "@mui/material";

import { FormData } from ".";

interface Props {
  register: UseFormRegister<FormData>;
}

const BaseEntryFrom = ({ register }: Props) => {
  return (
    <>
      <TextField label={"Description"} required {...register("description")} />
      <TextField label={"Date"} required {...register("date")} />
      <TextField label={"Specialist"} required {...register("specialist")} />
      <TextField label={"Diagnosis Codes"} {...register("diagnosisCodes")} />
    </>
  );
};

export default BaseEntryFrom;
