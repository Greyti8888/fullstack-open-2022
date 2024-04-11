import express from 'express';

import patientsService from '../src/services/patientsService';

const router = express.Router();

router.get('/', (_req, res) => {
  const patients = patientsService.getAllExludeSSN();
  res.send(patients);
});

export default router;
