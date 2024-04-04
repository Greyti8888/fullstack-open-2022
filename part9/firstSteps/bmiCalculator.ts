const calculateBmi = (height: number, weight: number): string => {
  if (Number.isNaN(height) || Number.isNaN(weight)) {
    throw new Error('bad user input')
  }
  const bmi = Number((weight / Math.pow(height / 100, 2)).toFixed(1))
  let output: string
  if (bmi < 16) return 'Underweight (Severe thinness)'
  else if (bmi >= 16 && bmi <= 16.9) output = 'Underweight (Moderate thinness)'
  else if (bmi >= 17 && bmi <= 18.4) output = 'Underweight (Mild thinness)'
  else if (bmi >= 18.5 && bmi <= 24.9) output = 'Normal (Healthy weight)'
  else if (bmi >= 25 && bmi <= 29.9) output = 'Overweight (Pre-obese)'
  else if (bmi >= 30 && bmi <= 34.9) output = 'Obese (Class I)'
  else if (bmi >= 35 && bmi <= 39.9) output = 'Obese (Class II)'
  else output = 'Obese (Class III)'
  console.log(output)
  return output
}

if (process.argv[2] === 'cl') {
  console.log(process.argv)
  const height: number = Number(process.argv[3])
  const weight: number = Number(process.argv[4])

  calculateBmi(height, weight)
}

export default calculateBmi
