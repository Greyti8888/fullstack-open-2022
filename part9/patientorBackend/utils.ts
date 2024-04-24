import { Gender, Types } from './types';

export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`,
  );
};

export const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};
export const isNumber = (value: unknown): value is number => {
  return typeof value === 'number' || value instanceof Number;
};
export const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};
export const isObject = (obj: unknown): obj is object => {
  return obj !== null && typeof obj === 'object';
};
export const isGender = (gender: string): gender is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(gender);
};
export const isType = (type: string): type is Types => {
  return Object.values(Types)
    .map((v) => v.toString())
    .includes(type);
};
