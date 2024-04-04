import express from 'express';
import calculateBmi from './bmiCalculator';

const app = express();

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
  } catch (error) {
    res.status(400).send({
      error: 'malformatted parameters',
    });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
