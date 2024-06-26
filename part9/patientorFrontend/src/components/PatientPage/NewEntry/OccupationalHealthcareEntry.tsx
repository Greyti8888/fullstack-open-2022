import { useState } from "react";
import { UseFormRegister } from "react-hook-form";
import { FormControlLabel, Switch, TextField } from "@mui/material";

import { FormData } from ".";

interface Props {
  register: UseFormRegister<FormData>;
}

const OccupationalHealthcare = ({ register }: Props) => {
  const [checked, setChecked] = useState(false);

  const handleSwitch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
  };

  return (
    <>
      <TextField
        label={"Employer Name"}
        required
        {...register("employerName")}
      />
      <FormControlLabel
        control={<Switch checked={checked} onChange={handleSwitch} />}
        label="Sick Leave"
      />
      {checked && (
        <>
          <TextField
            type="date"
            label={"Sick Leave Start Date"}
            required
            InputLabelProps={{ shrink: true }}
            {...register("sickLeaveStartDate")}
          />
          <TextField
            type="date"
            label={"Sick Leave End Date"}
            required
            InputLabelProps={{ shrink: true }}
            {...register("sickLeaveEndDate")}
          />
        </>
      )}
    </>
  );
};

export default OccupationalHealthcare;
