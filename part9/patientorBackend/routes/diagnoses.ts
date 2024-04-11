import express from 'express';

import diagnosesService from '../src/services/diagnosesService';

const router = express.Router();

router.get('/', (_req, res) => {
  const diagnoses = diagnosesService.getAll();
  res.send(diagnoses);
});

export default router;
