import express from 'express';

import patientsService from '../src/services/patientsService';
import { toNewPatient } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  const patients = patientsService.getAllExludeSSN();
  res.send(patients);
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  const patient = patientsService.getOne(id);
  if (patient) res.send(patient);
  else res.status(404).send();
});

router.post('/', (req, res) => {
  const newPatient = toNewPatient(req.body);
  const addedPatient = patientsService.add(newPatient);
  res.send(addedPatient);
});

export default router;
