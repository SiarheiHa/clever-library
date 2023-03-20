import React from 'react';

import { ReactComponent as DownIcon } from '../../assets/images/icons/icon-arrow-down.svg';
import { ReactComponent as UpIcon } from '../../assets/images/icons/icon-arrow-up.svg';
import { checkDateIsEqual, checkIsNextMonday, checkIsToday, checkIsTomorrow } from '../../utils/date';

import { useCalendar } from './hooks/use-calendar';

import styles from './calendar.module.scss';

interface CalendarProps {
  locale?: string;
  selectedDate: Date | null;
  selectDate: (date: Date) => void;
  firstWeekDayNumber?: number;
}

export const Calendar: React.FC<CalendarProps> = ({
  locale = 'default',
  selectedDate: date,
  selectDate,
  firstWeekDayNumber = 2,
}) => {
  const { functions, state } = useCalendar({
    locale,
    selectedDate: date,
    firstWeekDayNumber,
  });

  const onChangeMonthBySelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    functions.setSelectedMonthByIndex(Number(e.target.value));
  };

  return (
    <div className={styles.calendar} data-test-id='calendar'>
      <div className={styles.header}>
        <select
          className={styles.select}
          value={state.selectedMonth.monthIndex}
          onChange={onChangeMonthBySelect}
          data-test-id='month-select'
        >
          {state.monthesNames.map((name) => (
            <option
              value={name.monthIndex}
              className={styles.option}
              key={name.monthIndex}
            >{`${name.month} ${state.selectedYear}`}</option>
          ))}
        </select>
        <div className={styles.arrows}>
          <DownIcon
            onClick={() => functions.onClickArrow('right')}
            className={styles.arrow}
            data-test-id='button-next-month'
          />
          <UpIcon
            onClick={() => functions.onClickArrow('left')}
            className={styles.arrow}
            data-test-id='button-prev-month'
          />
        </div>
      </div>
      <div className={styles.body}>
        <div className={styles.day_names}>
          {state.weekDaysNames.map((weekDaysName) => (
            <div key={weekDaysName.dayShort}>{weekDaysName.dayShort}</div>
          ))}
        </div>
        <div className={styles.days}>
          {state.calendarDays.map((day) => {
            const isToday = checkIsToday(day.date);
            const isTommorow = checkIsTomorrow(day.date);
            const isSelectedDay = state.selectedDay ? checkDateIsEqual(day.date, state.selectedDay.date) : false;
            const isAdditionalDay = day.monthIndex !== state.selectedMonth.monthIndex;
            const isWeekend = day.dayNumberInWeek === 7 || day.dayNumberInWeek === 1;

            const isAvaibleDay =
              (isToday && !isWeekend) ||
              (isTommorow && !isWeekend) ||
              (day.dayNumberInWeek === 2 && checkIsNextMonday(day.date));

            return (
              <div
                key={`${day.dayNumber}-${day.monthIndex}`}
                aria-hidden={true}
                onClick={() => {
                  if (!isAvaibleDay) {
                    return;
                  }
                  functions.setSelectedDay(day);
                  selectDate(day.date);
                }}
                className={[
                  styles.day,
                  isAvaibleDay ? styles.avaible : '',
                  isToday ? styles.today : '',
                  isWeekend && !isAdditionalDay ? styles.weekend : '',
                  isSelectedDay ? styles.selected : '',
                ].join(' ')}
                data-test-id='day-button'
              >
                {day.dayNumber}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
