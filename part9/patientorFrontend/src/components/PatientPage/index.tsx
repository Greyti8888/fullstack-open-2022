import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Male, Female, Transgender } from "@mui/icons-material";

import { Diagnosis, Patient } from "../../types";
import DiagnosesContext from "./DiagnosesContext";

import patientService from "../../services/patients";
import diagnosesService from "../../services/diagnoses";

import EntryDetails from "./EntryDetails";
import NewEntry from "./NewEntry";
const PatientPage = () => {
  const id = useParams().id;
  const [patient, setPatient] = useState<Patient>();
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>();

  useEffect(() => {
    if (id) {
      const fetchPatient = async () => {
        const patient = await patientService.getOne(id);
        setPatient(patient);
      };

      fetchPatient();
    }
  }, [id]);

  useEffect(() => {
    const fetchDiagnoses = async () => {
      const diagnoses = await diagnosesService.getAll();
      setDiagnoses(diagnoses);
    };
    fetchDiagnoses();
  }, []);

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
    <DiagnosesContext.Provider value={diagnoses}>
      <div>
        <h2>
          {patient.name} {genderIcon}
        </h2>
        <div>gender: {patient.gender}</div>
        <div>born: {patient.dateOfBirth}</div>
        <div>ssn: {patient.ssn}</div>
        <div>occupation: {patient.occupation}</div>
        <h3>entries</h3>
        <NewEntry patient={patient} setPatient={setPatient} />
        {patient.entries?.map((entry) => (
          <EntryDetails key={entry.id} entry={entry} />
        ))}
      </div>
    </DiagnosesContext.Provider>
  );
};

export default PatientPage;
