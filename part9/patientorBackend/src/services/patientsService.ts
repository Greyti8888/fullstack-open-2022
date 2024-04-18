import patientsData from '../../data/patients';
import { v1 as uuid } from 'uuid';

import { Patient, NonSensativePatient, NewPatient } from '../../types';

const patientDataWithEntries = patientsData.map((patient) => ({
  ...patient,
  entries: [],
}));

const patients: Patient[] = patientDataWithEntries;

const getAllExludeSSN = (): NonSensativePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getOne = (id: string): Patient | undefined => {
  const patient = patients.find((patient) => patient.id === id);
  return patient;
};

const add = (patient: NewPatient) => {
  const id = uuid();
  const newPatient: Patient = {
    id,
    ...patient,
  };
  patients.push(newPatient);
  return newPatient;
};

export default {
  getAllExludeSSN,
  getOne,
  add,
};
