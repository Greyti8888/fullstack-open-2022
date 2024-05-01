import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import dayjs from "dayjs";
import { Box, Button, Stack, Alert, MenuItem, TextField } from "@mui/material";

import BaseEntryFrom from "./BaseEntryFrom";
import HealthCheckEntryForm from "./HealthCheckEntryForm";
import HostpitalForm from "./HostpitalEntryForm";
import OccupationalHealthcare from "./OccupationalHealthcareEntry";

import { EntryWithoutId, Patient, Types } from "../../../types";
import { assertNever } from "../../../utils";

import patientService from "../../../services/patients";

interface Props {
  patient: Patient;
  setPatient: React.Dispatch<React.SetStateAction<Patient | undefined>>;
}

export interface BasicFormData {
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: string[];
}

interface HealthCheckFormData extends BasicFormData {
  type: Types.HealthCheck;
  healthCheckRating: string;
}

interface HospitalFormData extends BasicFormData {
  type: Types.Hospital;
  dischargeDate?: string;
  dischargeCriteria?: string;
}

interface OccupationalHealthcareFormData extends BasicFormData {
  type: Types.OccupationalHealthcare;
  employerName: string;
  sickLeaveStartDate?: string;
  sickLeaveEndDate?: string;
}

export type FormData =
  | HealthCheckFormData
  | HospitalFormData
  | OccupationalHealthcareFormData;

const NewEntry = ({ patient, setPatient }: Props) => {
  const [show, setShow] = useState<boolean>(false);
  const { register, handleSubmit, watch, control } = useForm<FormData>({
    defaultValues: {
      date: dayjs().format("YYYY-MM-DD"),
      healthCheckRating: "",
      diagnosisCodes: [],
      dischargeDate: dayjs().format("YYYY-MM-DD"),
      sickLeaveStartDate: dayjs().format("YYYY-MM-DD"),
      sickLeaveEndDate: "",
    },
  });
  const [notification, setNotification] = useState<string | null>(null);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const { type, ...restOfData } = data;
    let entry: EntryWithoutId;
    switch (type) {
      case Types.HealthCheck: {
        entry = {
          type,
          ...restOfData,
          healthCheckRating: Number(data.healthCheckRating),
        };
        break;
      }
      case Types.Hospital: {
        const { dischargeDate, dischargeCriteria } = data;
        let discharge;
        if (dischargeDate && dischargeCriteria) {
          discharge = {
            date: dischargeDate,
            criteria: dischargeCriteria,
          };
        }
        entry = {
          type,
          ...restOfData,
          discharge,
        };
        break;
      }
      case Types.OccupationalHealthcare: {
        const { sickLeaveStartDate, sickLeaveEndDate, employerName } = data;
        let sickLeave;
        if (sickLeaveStartDate && sickLeaveEndDate) {
          sickLeave = {
            startDate: sickLeaveStartDate,
            endDate: sickLeaveEndDate,
          };
        } else sickLeave = undefined;
        entry = {
          type,
          ...restOfData,
          employerName,
          sickLeave,
        };
        break;
      }
      default:
        return assertNever(type);
    }
    try {
      console.log(entry);
      const newEntry = await patientService.addEntry(entry, patient.id);
      setNotification("Entry was added succesfuly");
      setTimeout(() => setNotification(null), 5000);
      setPatient({ ...patient, entries: patient.entries?.concat(newEntry) });
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
            label="Select Entry Type"
            select
            defaultValue={""}
            {...register("type")}
          >
            {Object.values(Types).map((v) => (
              <MenuItem key={v} value={v}>
                {v}
              </MenuItem>
            ))}
          </TextField>
          {watch("type") && (
            <>
              <BaseEntryFrom control={control} register={register} />
              {((type) => {
                switch (type) {
                  case Types.HealthCheck:
                    return (
                      <HealthCheckEntryForm
                        control={control}
                        register={register}
                      />
                    );
                  case Types.Hospital:
                    return <HostpitalForm register={register} />;
                  case Types.OccupationalHealthcare:
                    return <OccupationalHealthcare register={register} />;
                  default:
                    return null;
                }
              })(watch("type"))}
              <Box display={"flex"} gap={1}>
                <Button
                  type="submit"
                  variant="contained"
                  style={{ flexGrow: 5 }}
                >
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
            </>
          )}
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
