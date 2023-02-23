import React, { useState } from 'react';
import classNames from 'classnames';

import arrow from '../../assets/images/icons/arrow-sort.svg';
import menu from '../../assets/images/icons/menu.svg';
import square from '../../assets/images/icons/square-four.svg';
import {
  selectSearchString,
  selectSortingType,
  setSearchString,
  setSortingType,
  useAppDispatch,
  useAppSelector,
} from '../../store';
import { View } from '../../types/types';
import { Button } from '../button';
import { Input } from '../input';

import styles from './controls.module.scss';

interface ControlsProps {
  selectedButton: View;
  onViewClick: (view: View) => void;
}

const Controls: React.FC<ControlsProps> = ({ onViewClick, selectedButton }) => {
  const sort = useAppSelector(selectSortingType);
  const searchString = useAppSelector(selectSearchString);
  const dispatch = useAppDispatch();
  const [isInputOpen, setInputOpen] = useState<boolean>(false);

  const toggleView = () => {
    setInputOpen(!isInputOpen);
  };

  const toggleSort = () => {
    dispatch(setSortingType({ sort: sort === 'desc' ? 'asc' : 'desc' }));
  };

  const onInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    dispatch(setSearchString({ searchString: e.currentTarget.value }));
  };

  const inputClasses = classNames({ [styles.input]: !isInputOpen });
  const sortIconClasses = classNames(styles.icon, { [styles.revert]: sort === 'asc' });

  return (
    <div className={styles.controls}>
      <Input onChange={onInputChange} value={searchString} onButtonClick={toggleView} className={inputClasses} />
      {!isInputOpen && (
        <React.Fragment>
          <Button onClick={toggleSort} className={styles.button_sort} bordered={false} testId='sort-rating-button'>
            <img className={sortIconClasses} src={arrow} alt='sort' />
            <span className={styles.button_text}>По рейтингу</span>
          </Button>
          <Button
            onClick={() => {
              onViewClick('table');
            }}
            rounded={true}
            contained={selectedButton === 'table'}
            disabled={selectedButton === 'table'}
            bordered={false}
            testId='button-menu-view-window'
            className={styles.button_view}
          >
            <img src={square} alt='table-view' />
          </Button>
          <Button
            onClick={() => {
              onViewClick('list');
            }}
            contained={selectedButton === 'list'}
            disabled={selectedButton === 'list'}
            rounded={true}
            bordered={false}
            testId='button-menu-view-list'
          >
            <img src={menu} alt='list-view' />
          </Button>
        </React.Fragment>
      )}
    </div>
  );
};

export { Controls };
