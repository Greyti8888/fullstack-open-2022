interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDiscription: string;
  target: number;
  average: number;
}

type RatingArray = [number, string];

const calculateExercises = (days: number[], target: number): Result => {
  if (!days.length) throw new Error('bad user input');
  let daysIsNumbersArray: boolean = true;
  for (let i = 0; i < days.length; i++) {
    if (Number.isNaN(days[i])) {
      daysIsNumbersArray = false;
      break;
    } else continue;
  }
  if (!daysIsNumbersArray) throw new Error('bad user input');
  if (typeof target !== 'number' || Number.isNaN(target))
    throw new Error('bad user input');
  const periodLength = days.length;
  const trainingDays = days.filter((day) => day > 0).length;
  const average = days.reduce((prev, curr) => prev + curr, 0) / periodLength;
  const success = average >= target;
  const averageTargetRatio = average / target;

  const ratingArray: RatingArray[] = [
    [1, 'bad'],
    [2, 'ok'],
    [3, 'good'],
  ];

  let rating!: number;
  let ratingDiscription!: string;

  if (averageTargetRatio <= 0.5) {
    rating = ratingArray[0][0];
    ratingDiscription = ratingArray[0][1];
  } else if (averageTargetRatio > 0.5 && averageTargetRatio < 1) {
    rating = ratingArray[1][0];
    ratingDiscription = ratingArray[1][1];
  } else if (averageTargetRatio > 1) {
    rating = ratingArray[2][0];
    ratingDiscription = ratingArray[2][1];
  }

  const output = {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDiscription,
    target,
    average,
  };

  console.log(output);
  return output;
};

if (process.argv[2] === 'cl') {
  const target: number = Number(process.argv[3]);
  const days: number[] = [];
  process.argv.forEach((value, i) => {
    if (i === 0 || i === 1 || i === 2 || i === 3) return;
    else days.push(Number(value));
  });

  calculateExercises(days, target);
}

export default calculateExercises;
