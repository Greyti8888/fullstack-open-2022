import patients from '../../data/patients';

import { PatientOmitSSN } from '../../types';

const getAllExludeSSN = (): PatientOmitSSN[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export default {
  getAllExludeSSN,
};
