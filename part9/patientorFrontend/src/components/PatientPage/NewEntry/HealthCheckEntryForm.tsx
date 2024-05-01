import { Control, Controller, UseFormRegister } from "react-hook-form";
import { MenuItem, TextField } from "@mui/material";

import { HealthCheckRating } from "../../../types";
import { FormData } from ".";

interface Props {
  control: Control<FormData>;
  register: UseFormRegister<FormData>;
}

const HealthCheckEntryForm = ({ control }: Props) => {
  return (
    <>
      <Controller
        name="healthCheckRating"
        control={control}
        render={({ field }) => (
          <TextField label="Health Rating" required select {...field}>
            {Object.values(HealthCheckRating)
              .filter((v) => typeof v === "number")
              .map((rating) => (
                <MenuItem key={rating} value={rating}>
                  {rating}
                </MenuItem>
              ))}
          </TextField>
        )}
      />
    </>
  );
};

export default HealthCheckEntryForm;
