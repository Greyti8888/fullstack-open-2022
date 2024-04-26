import { UseFormRegister } from "react-hook-form";
import { FormControlLabel, Switch, TextField } from "@mui/material";

import { FormData } from ".";
import { useState } from "react";

interface Props {
  register: UseFormRegister<FormData>;
}

const HostpitalForm = ({ register }: Props) => {
  const [checked, setChecked] = useState(false);
  const handleSwitch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
  };

  return (
    <>
      <FormControlLabel
        control={<Switch checked={checked} onChange={handleSwitch} />}
        label="Discharge"
      />
      {checked && (
        <>
          <TextField
            label={"Discharge Date"}
            required
            {...register("dischargeDate")}
          />
          <TextField
            label={"Discharge Criteria"}
            required
            {...register("dischargeCriteria")}
          />
        </>
      )}
    </>
  );
};

export default HostpitalForm;
