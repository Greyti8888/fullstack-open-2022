import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Male, Female, Transgender } from "@mui/icons-material";

import { Diagnosis, Patient } from "../types";

import patientService from "../services/patients";
import diagnosesService from "../services/diagnoses";

const PatientPage = () => {
  const id = useParams().id;
  const [patient, setPatient] = useState<Patient | undefined>();
  const [diagnoses, setDiagnoses] = useState<Diagnosis[] | undefined>();

  useEffect(() => {
    const fetchPatient = async () => {
      const patient = await patientService.getOne(id);
      setPatient(patient);
    };

    fetchPatient();
  }, [id]);

  useEffect(() => {
    const fetchDiagnoses = async () => {
      const diagnoses = await diagnosesService.getAll();
      setDiagnoses(diagnoses);
    };

    fetchDiagnoses();
  });

  if (!patient) return null;

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
      <h3>
        {patient.name} {genderIcon}
      </h3>
      <div>gender: {patient.gender}</div>
      <div>born: {patient.dateOfBirth}</div>
      <div>ssn: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>
      <h4>entries</h4>
      {patient.entries?.map((entry) => {
        return (
          <div key={entry.id}>
            <div>{entry.date}</div>
            <div>{entry.description}</div>
            {entry.diagnosisCodes && (
              <ul>
                {entry.diagnosisCodes?.map((code) => {
                  const diagnosis = diagnoses?.find(
                    (diagnosis) => diagnosis.code === code,
                  );
                  return (
                    <li>
                      {diagnosis?.code} {diagnosis?.name}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default PatientPage;
