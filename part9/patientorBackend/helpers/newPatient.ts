import { NewPatient } from '../types';

import { isDate, isGender, isString } from '../utils';

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect name: ' + name);
  }
  return name;
};
const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error('Incorrect date of birth: ' + dateOfBirth);
  }
  return dateOfBirth;
};
const parseGender = (gender: unknown): string => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect gender: ' + gender);
  }
  return gender;
};
const parseSSN = (ssn: unknown): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect ssn: ' + ssn);
  }
  return ssn;
};
const parseOcupation = (ocupation: unknown): string => {
  if (!ocupation || !isString(ocupation)) {
    throw new Error('Incorrect ssn: ' + ocupation);
  }
  return ocupation;
};

export const toNewPatient = (data: unknown): NewPatient => {
  if (!data || typeof data !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if (
    'name' in data &&
    'dateOfBirth' in data &&
    'gender' in data &&
    'ssn' in data &&
    'occupation' in data
  ) {
    const newPatient: NewPatient = {
      name: parseName(data.name),
      dateOfBirth: parseDateOfBirth(data.dateOfBirth),
      gender: parseGender(data.gender),
      ssn: parseSSN(data.ssn),
      occupation: parseOcupation(data.occupation),
      entries: [],
    };
    return newPatient;
  }

  throw new Error('Incorrect data: some fields are missing');
};
