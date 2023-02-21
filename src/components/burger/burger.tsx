import classNames from 'classnames';

import { selectMenuMode, setMenuMode, useAppDispatch, useAppSelector } from '../../store';
import { Button } from '../button';

import styles from './burger.module.scss';

const Burger = ({ className }: { className?: string }) => {
  const menuMode = useAppSelector(selectMenuMode);
  const classes = classNames(className, styles.burger, menuMode === 'open' && styles.open);
  const dispatch = useAppDispatch();
  // const [blockScroll, allowScroll] = useScrollBlock();

  const toggleBurger = () => {
    if (menuMode === 'open') {
      // allowScroll();
      dispatch(setMenuMode({ mode: 'close' }));
    } else {
      // blockScroll();
      dispatch(setMenuMode({ mode: 'open' }));
    }
  };

  return (
    <Button onClick={toggleBurger} className={classes} bordered={false} shadowed={false} testId='button-burger'>
      <div className={styles.line} />
      <div className={styles.line} />
      <div className={styles.line} />
    </Button>
  );
};

export { Burger };
