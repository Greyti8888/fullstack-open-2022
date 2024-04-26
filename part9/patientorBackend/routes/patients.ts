import express from 'express';

import patientsService from '../src/services/patientsService';
import { toNewPatient } from '../helpers/newPatient';
import { toNewEntry } from '../helpers/newEntry';

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
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientsService.addPatient(newPatient);
    res.send(addedPatient);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    }
  }
});

router.post('/:id/entries', (req, res) => {
  const id = req.params.id;
  const patient = patientsService.getOne(id);
  if (patient) {
    try {
      const newEntry = toNewEntry(req.body);
      const addedEntry = patientsService.addEntry(patient, newEntry);
      res.send(addedEntry);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).send(error.message);
      }
    }
  } else res.status(400).send;
});

export default router;
