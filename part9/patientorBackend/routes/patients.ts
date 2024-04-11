/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';

import patientsService from '../src/services/patientsService';

const router = express.Router();

router.get('/', (_req, res) => {
  const patients = patientsService.getAllExludeSSN();
  res.send(patients);
});

router.post('/', (req, res) => {
  const { name, dateOfBirth, gender, ssn, occupation } = req.body;
  const newPatient = patientsService.add({
    name,
    dateOfBirth,
    gender,
    ssn,
    occupation,
  });
  res.send(newPatient);
});

export default router;
