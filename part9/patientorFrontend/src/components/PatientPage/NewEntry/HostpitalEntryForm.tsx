import { useState } from "react";
import { UseFormRegister } from "react-hook-form";
import { FormControlLabel, Switch, TextField } from "@mui/material";

import { FormData } from ".";
interface Props {
  register: UseFormRegister<FormData>;
}

const HostpitalForm = ({ register }: Props) => {
  const [checked, setChecked] = useState(false);

  return (
    <>
      <FormControlLabel
        control={
          <Switch
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
          />
        }
        label="Discharge"
      />
      {checked && (
        <>
          <TextField
            label="Discharge Date"
            type="date"
            required
            InputLabelProps={{ shrink: true }}
            {...register("dischargeDate")}
          />
          <TextField
            label="Discharge Criteria"
            required
            {...register("dischargeCriteria")}
          />
        </>
      )}
    </>
  );
};

export default HostpitalForm;
