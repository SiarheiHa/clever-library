import { createDate } from './create-date';

export const getWeekDaysNames = (firstWeekDay = 4, locale = 'ru-RU') => {
  const weekDaysNames: Array<{
    day: ReturnType<typeof createDate>['day'];
    dayShort: ReturnType<typeof createDate>['dayShort'];
  }> = Array.from({ length: 7 });

  const date = new Date();

  weekDaysNames.forEach((_, i) => {
    const { day, dayNumberInWeek, dayShort } = createDate({
      locale,
      date: new Date(date.getFullYear(), date.getMonth(), date.getDate() + i),
    });

    weekDaysNames[dayNumberInWeek - 1] = { day, dayShort };
  });

  return [...weekDaysNames.slice(firstWeekDay - 1), ...weekDaysNames.slice(0, firstWeekDay - 1)];
};
