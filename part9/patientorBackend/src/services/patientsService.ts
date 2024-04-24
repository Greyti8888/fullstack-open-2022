import { v1 as uuid } from 'uuid';

import {
  Patient,
  NonSensativePatient,
  NewPatient,
  EntryWithoutId,
  Entry,
} from '../../types';

import patients from '../../data/patients-full';

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

const addPatient = (patient: NewPatient) => {
  const id = uuid();
  const newPatient: Patient = {
    id,
    ...patient,
  };
  patients.push(newPatient);
  return newPatient;
};

const addEntry = (patient: Patient, entry: EntryWithoutId) => {
  const id = uuid();
  const newEntry: Entry = {
    id,
    ...entry,
  };
  patient.entries.push(newEntry);
  return newEntry;
};

export default {
  getAllExludeSSN,
  getOne,
  addPatient,
  addEntry,
};
