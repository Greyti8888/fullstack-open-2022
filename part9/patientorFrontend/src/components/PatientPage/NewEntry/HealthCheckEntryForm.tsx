import { UseFormRegister } from "react-hook-form";
import { TextField } from "@mui/material";

import { FormData } from ".";

interface Props {
  register: UseFormRegister<FormData>;
}

const HealthCheckEntryForm = ({ register }: Props) => {
  return (
    <>
      <TextField
        label={"Health Rating"}
        required={true}
        {...register("healthCheckRating")}
      />
    </>
  );
};

export default HealthCheckEntryForm;
