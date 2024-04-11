import patientsData from '../../data/patients';
import { v1 as uuid } from 'uuid';

import { Patient, PatientOmitSSN, NewPatient } from '../../types';

const patients: Patient[] = patientsData;

const getAllExludeSSN = (): PatientOmitSSN[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
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
  add,
};
