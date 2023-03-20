import { checkDateIsEqual } from './check-date-is-equal';

export const checkIsNextMonday = (date: Date) => {
  const today = new Date();
  const monday1 = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
  const monday2 = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2);
  const monday3 = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 3);

  return checkDateIsEqual(monday1, date) || checkDateIsEqual(monday2, date) || checkDateIsEqual(monday3, date);
};
