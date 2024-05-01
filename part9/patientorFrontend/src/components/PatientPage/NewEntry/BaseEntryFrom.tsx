import { useContext } from "react";
import { Control, Controller, UseFormRegister } from "react-hook-form";
import { Box, Chip, MenuItem, TextField } from "@mui/material";

import { FormData } from ".";
import DiagnosesContext from "../DiagnosesContext";

interface Props {
  control: Control<FormData>;
  register: UseFormRegister<FormData>;
}

const BaseEntryFrom = ({ control, register }: Props) => {
  const diagnoses = useContext(DiagnosesContext);

  return (
    <>
      <TextField label="Description" required {...register("description")} />
      <TextField
        type="date"
        label="Date"
        required
        InputLabelProps={{ shrink: true }}
        {...register("date")}
      />
      <TextField label="Specialist" required {...register("specialist")} />
      <Controller
        name="diagnosisCodes"
        control={control}
        render={({ field }) => (
          <TextField
            label="Diagnosis Codes"
            select
            {...field}
            SelectProps={{
              multiple: true,
              MenuProps: {
                PaperProps: {
                  style: {
                    maxHeight: 300,
                  },
                },
              },
              renderValue: (selected: unknown) => {
                const selectedArray = selected as string[];
                return (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selectedArray.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                );
              },
            }}
          >
            {diagnoses?.map((diagnosis) => (
              <MenuItem key={diagnosis.code} value={diagnosis.code}>
                {diagnosis.code}
              </MenuItem>
            ))}
          </TextField>
        )}
      />
    </>
  );
};

export default BaseEntryFrom;
