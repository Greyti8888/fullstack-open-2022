import {
  Diagnosis,
  Types,
  Discharge,
  HealthCheckRating,
  EntryWithoutId,
  SickLeave,
} from '../types';
import {
  isString,
  isDate,
  isType,
  isObject,
  isNumber,
  assertNever,
} from '../utils';

const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error('Incorrect description: ' + description);
  }
  return description;
};
const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect date: ' + date);
  }
  return date;
};
const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error('Incorrect specialist: ' + specialist);
  }
  return specialist;
};

const parseDiagnosisCodes = (
  diagnosisCodes: unknown,
): Array<Diagnosis['code']> => {
  if (!Array.isArray(diagnosisCodes)) {
    throw new Error('Incorrect diagnosis codes: ' + diagnosisCodes);
  }

  return diagnosisCodes as Array<Diagnosis['code']>;
};

const parseType = (type: unknown): Types => {
  if (!type || !isString(type) || !isType(type)) {
    throw new Error('Incorrect type: ' + type);
  }
  return type;
};

const parseDischarge = (discharge: unknown): Discharge => {
  if (!isObject(discharge)) {
    throw new Error('Incorrect discharge: ' + discharge);
  }

  const { date, criteria } = discharge as Discharge;
  if (!date || !isString(date)) {
    throw new Error('Incorrect discharge date: ' + date);
  }
  if (!criteria || !isString(criteria)) {
    throw new Error('Incorrect discharge criteria: ' + criteria);
  }
  return { date, criteria };
};

const parseEmloyerName = (employerName: unknown): string => {
  if (!employerName || !isString(employerName)) {
    throw new Error('Incorrect specialist: ' + employerName);
  }
  return employerName;
};
const parseSickLeave = (sickLeave: unknown): SickLeave => {
  if (!isObject(sickLeave)) {
    throw new Error('Incorrect sick leave: ' + sickLeave);
  }

  const { startDate, endDate } = sickLeave as SickLeave;
  if (!startDate || !isString(startDate)) {
    throw new Error('Incorrect sick leave start date: ' + startDate);
  }
  if (!endDate || !isString(endDate)) {
    throw new Error('Incorrect sick leave end date: ' + endDate);
  }
  return { startDate, endDate };
};

const parseHealthCheckRating = (
  healthCheckRating: unknown,
): HealthCheckRating => {
  if (
    !healthCheckRating ||
    !isNumber(healthCheckRating) ||
    !Object.values(HealthCheckRating).includes(healthCheckRating)
  ) {
    throw new Error('Incorrect health check rating: ' + healthCheckRating);
  } else return healthCheckRating;
};

export const toNewEntry = (data: unknown): EntryWithoutId => {
  if (!data || typeof data !== 'object') {
    throw new Error('Incorect or missing data');
  }
  if (
    'description' in data &&
    'date' in data &&
    'specialist' in data &&
    'type' in data
  ) {
    const newEntry = {
      description: parseDescription(data.description),
      date: parseDate(data.date),
      specialist: parseSpecialist(data.specialist),
      ...('diagnosisCodes' in data
        ? { diagnosisCodes: parseDiagnosisCodes(data.diagnosisCodes) }
        : {}),
    };

    const type = parseType(data.type);
    switch (type) {
      case Types.Hospital: {
        return {
          type,
          ...newEntry,
          ...('discharge' in data
            ? { discharge: parseDischarge(data.discharge) }
            : {}),
        };
      }
      case Types.OccupationalHealthcare: {
        if (!('employerName' in data)) break;
        return {
          type,
          ...newEntry,
          employerName: parseEmloyerName(data.employerName),
          ...('sickLeave' in data
            ? { sickLeave: parseSickLeave(data.sickLeave) }
            : {}),
        };
      }
      case Types.HealthCheck: {
        if (!('healthCheckRating' in data)) break;
        return {
          type,
          ...newEntry,
          healthCheckRating: parseHealthCheckRating(data.healthCheckRating),
        };
      }
      default:
        return assertNever(type);
    }
  }

  throw new Error('Incorrect data: some fields are missing');
};
