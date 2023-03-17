import React from 'react';

import { ReactComponent as DownIcon } from '../../assets/images/icons/icon-arrow-down.svg';
import { ReactComponent as UpIcon } from '../../assets/images/icons/icon-arrow-up.svg';
import { checkDateIsEqual, checkIsNextMonday, checkIsToday, checkIsTomorrow } from '../../utils/date';

import { useCalendar } from './hooks/use-calendar';

import './calendar.scss';
import styles from './calendar.module.scss';

interface CalendarProps {
  locale?: string;
  selectedDate: Date;
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

  // console.log(state.selectedMonth);

  return (
    <div className={styles.calendar}>
      <div className={styles.header}>
        <select
          className={styles.select}
          // value={`${state.monthesNames[state.selectedMonth.monthIndex].month} ${state.selectedYear}`}
          // defaultValue={`${state.monthesNames[state.selectedMonth.monthIndex].month} ${state.selectedYear}`}
          value={state.selectedMonth.monthIndex}
          onChange={() => {}}
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
          <DownIcon onClick={() => functions.onClickArrow('right')} className={styles.arrow} />
          <UpIcon onClick={() => functions.onClickArrow('left')} className={styles.arrow} />
        </div>
        {/* <div
          aria-hidden={true}
          className='calendar__header__arrow__left'
          onClick={() => functions.onClickArrow('left')}
        /> */}
        {/* {state.mode === 'days' && (
          <div aria-hidden={true} onClick={() => functions.setMode('monthes')}>
            {state.monthesNames[state.selectedMonth.monthIndex].month} {state.selectedYear}
          </div>
        )} */}
        {/* {state.mode === 'monthes' && (
          <div aria-hidden={true} onClick={() => functions.setMode('years')}>
            {state.selectedYear}
          </div>
        )} */}
        {/* {state.mode === 'years' && (
          <div>
            {state.selectedYearsInterval[0]} - {state.selectedYearsInterval[state.selectedYearsInterval.length - 1]}
          </div>
        )} */}
        {/* <div
          aria-hidden={true}
          className='calendar__header__arrow__right'
          onClick={() => functions.onClickArrow('right')}
        /> */}
      </div>
      <div className={styles.body}>
        {state.mode === 'days' && (
          <React.Fragment>
            <div className={styles.day_names}>
              {state.weekDaysNames.map((weekDaysName) => (
                <div key={weekDaysName.dayShort}>{weekDaysName.dayShort}</div>
              ))}
            </div>
            <div className={styles.days}>
              {state.calendarDays.map((day) => {
                const isToday = checkIsToday(day.date);
                const isTommorow = checkIsTomorrow(day.date);
                const isSelectedDay = checkDateIsEqual(day.date, state.selectedDay.date);
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
                      // isAdditionalDay ? 'calendar__additional__day' : '',
                    ].join(' ')}
                  >
                    {day.dayNumber}
                  </div>
                );
              })}
            </div>
          </React.Fragment>
        )}
        {/* 
        {state.mode === 'monthes' && (
          <div className='calendar__pick__items__container'>
            {state.monthesNames.map((monthesName) => {
              const isCurrentMonth =
                new Date().getMonth() === monthesName.monthIndex && state.selectedYear === new Date().getFullYear();
              const isSelectedMonth = monthesName.monthIndex === state.selectedMonth.monthIndex;

              return (
                <div
                  key={monthesName.month}
                  aria-hidden={true}
                  onClick={() => {
                    functions.setSelectedMonthByIndex(monthesName.monthIndex);
                    functions.setMode('days');
                  }}
                  className={[
                    'calendar__pick__item',
                    isSelectedMonth ? 'calendar__selected__item' : '',
                    isCurrentMonth ? 'calendar__today__item' : '',
                  ].join(' ')}
                >
                  {monthesName.monthShort}
                </div>
              );
            })}
          </div>
        )}

        {state.mode === 'years' && (
          <div className='calendar__pick__items__container'>
            <div className='calendar__unchoosable__year'>{state.selectedYearsInterval[0] - 1}</div>
            {state.selectedYearsInterval.map((year) => {
              const isCurrentYear = new Date().getFullYear() === year;
              const isSelectedYear = year === state.selectedYear;

              return (
                <div
                  key={year}
                  aria-hidden={true}
                  onClick={() => {
                    functions.setSelectedYear(year);
                    functions.setMode('monthes');
                  }}
                  className={[
                    'calendar__pick__item',
                    isCurrentYear ? 'calendar__today__item' : '',
                    isSelectedYear ? 'calendar__selected__item' : '',
                  ].join(' ')}
                >
                  {year}
                </div>
              );
            })}
            <div className='calendar__unchoosable__year'>
              {state.selectedYearsInterval[state.selectedYearsInterval.length - 1] + 1}
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
};
