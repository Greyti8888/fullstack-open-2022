interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDiscription: string,
  target: number,
  average: number
}

type RatingArray = [number, string]

const calculateExercises = (days: number[], target: number): Result => {

  const periodLength = days.length
  const trainingDays = days.filter(day => day > 0).length
  const average = days.reduce((prev, curr) => prev + curr, 0) / periodLength
  const success = average >= target
  const averageTargetRatio = average / target

  const ratingArray: RatingArray[] = [
    [1, 'bad'],
    [2, 'ok'],
    [3, 'good']
  ]

  let rating: number
  let ratingDiscription: string

  if (averageTargetRatio <= 0.5) {
    rating = ratingArray[0][0]
    ratingDiscription = ratingArray[0][1]
  }
  else if (averageTargetRatio > 0.5 && averageTargetRatio < 1) {
    rating = ratingArray[1][0]
    ratingDiscription = ratingArray[1][1]
  }
  else if (averageTargetRatio > 1) {
    rating = ratingArray[2][0]
    ratingDiscription = ratingArray[2][1]
  }

  const output = {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDiscription,
    target,
    average
  }

  return output
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))