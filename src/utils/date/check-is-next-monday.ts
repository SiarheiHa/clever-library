import { checkDateIsEqual } from './check-date-is-equal';

export const checkIsNextMonday = (date: Date) => {
  const today = new Date();
  const monday = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3);

  return checkDateIsEqual(monday, date);
};
