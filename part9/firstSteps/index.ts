import express from 'express';
import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  console.log(req.query);
  console.log(req.body);
  const height: number = Number(req.query.height);
  const weight: number = Number(req.query.weight);
  try {
    const bmi = calculateBmi(height, weight);
    const output = {
      height,
      weight,
      bmi,
    };
    res.send(output);
  } catch (err) {
    res.status(400).send({
      error: 'malformatted parameters',
    });
  }
});

app.post('/exercises', (req, res) => {
  console.log(req.body);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;
  if (!daily_exercises || !target) {
    res.status(400).send({
      error: 'parameters missing',
    });
  }
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const output = calculateExercises(daily_exercises, target);
    res.send(output);
  } catch (err) {
    res.status(400).send({
      error: 'malformatted parameters',
    });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
