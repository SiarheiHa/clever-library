import { checkDateIsEqual } from './check-date-is-equal';

export const checkIsTomorrow = (date: Date) => {
  const today = new Date();
  const tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

  return checkDateIsEqual(tomorrow, date);
};
