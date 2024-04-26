import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Male, Female, Transgender } from "@mui/icons-material";

import { Patient } from "../../types";

import patientService from "../../services/patients";

import EntryDetails from "./EntryDetails";
import NewEntry from "./NewEntry";

const PatientPage = () => {
  const id = useParams().id;
  const [patient, setPatient] = useState<Patient | undefined>();

  useEffect(() => {
    if (id) {
      const fetchPatient = async () => {
        const patient = await patientService.getOne(id);
        setPatient(patient);
      };

      fetchPatient();
    }
  }, [id]);

  if (!id || !patient) return null;

  const genderIcon =
    patient.gender === "male" ? (
      <Male />
    ) : patient.gender === "female" ? (
      <Female />
    ) : (
      <Transgender />
    );

  return (
    <div>
      <h2>
        {patient.name} {genderIcon}
      </h2>
      <div>gender: {patient.gender}</div>
      <div>born: {patient.dateOfBirth}</div>
      <div>ssn: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>
      <h3>entries</h3>
      <NewEntry patientId={id} />
      {patient.entries?.map((entry) => (
        <EntryDetails key={entry.id} entry={entry} />
      ))}
    </div>
  );
};

export default PatientPage;
