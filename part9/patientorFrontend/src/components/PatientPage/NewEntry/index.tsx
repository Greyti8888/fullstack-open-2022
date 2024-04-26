import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { Box, Button, Stack, TextField, Alert } from "@mui/material";

import { EntryWithoutId } from "../../../types";

import patientService from "../../../services/patients";

interface Props {
  patientId: string;
}

interface FormValues {
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes: string;
  healthCheckRating: string;
}

const NewEntry = ({ patientId }: Props) => {
  const [show, setShow] = useState<boolean>(false);
  const { register, handleSubmit } = useForm<FormValues>();
  const [notification, setNotification] = useState<string | null>(null);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const entry: EntryWithoutId = {
      type: "HealthCheck",
      ...data,
      diagnosisCodes: data.diagnosisCodes.split(", ") || undefined,
      healthCheckRating: Number(data.healthCheckRating),
    };
    try {
      const newEntry = await patientService.addEntry(entry, patientId);
      setNotification("Entry was added succesfuly");
      setTimeout(() => setNotification(null), 5000);
      console.log(newEntry);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace(
            "Something went wrong. Error: ",
            "",
          );
          console.error(message);
          setNotification(message);
        } else {
          console.error(e);
          setNotification("Unrecognized axios error");
          setTimeout(() => setNotification(null), 5000);
        }
      } else {
        console.error("Unknown error", e);
        setNotification("Unknown error");
        setTimeout(() => setNotification(null), 5000);
      }
    }
  };

  if (show) {
    return (
      <Box
        component={"form"}
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          border: "1px solid black",
          padding: "5px",
          marginBottom: "10px",
        }}
      >
        {notification && <Alert severity="info">{notification}</Alert>}
        <Stack spacing={2}>
          <h3>New Entry</h3>
          <TextField
            label={"Description"}
            {...register("description")}
          ></TextField>
          <TextField label={"Date"} {...register("date")}></TextField>
          <TextField
            label={"Specialist"}
            {...register("specialist")}
          ></TextField>
          <TextField
            label={"Diagnosis Codes"}
            {...register("diagnosisCodes")}
          ></TextField>
          <TextField
            type="number"
            label={"Health Check Rating"}
            {...register("healthCheckRating")}
          ></TextField>

          <Box display={"flex"} gap={1}>
            <Button type="submit" variant="contained" style={{ flexGrow: 5 }}>
              Add
            </Button>
            <Button
              type="button"
              variant="contained"
              color="error"
              style={{ flexGrow: 1 }}
              onClick={() => setShow(false)}
            >
              Cancel
            </Button>
          </Box>
        </Stack>
      </Box>
    );
  } else
    return (
      <Button
        variant="contained"
        sx={{ marginBottom: "10px" }}
        onClick={() => setShow(true)}
      >
        Add New Entry
      </Button>
    );
};

export default NewEntry;
