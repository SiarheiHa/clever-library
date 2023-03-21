import React from 'react';
import classNames from 'classnames';

import styles from './hightligh.module.scss';

interface HightlightProps {
  filter: string;
  str: string;
  testId?: string;
}

const Hightlight: React.FC<HightlightProps> = ({ filter, str, testId }) => {
  if (!filter) return <span>{str}</span>;
  const dataTestId = testId || 'highlight-matches';
  const classes = classNames(dataTestId === 'highlight-matches' ? styles.hightlight_search : styles.hightlight_form);
  const prop = dataTestId === 'hint' ? { 'data-test-id': dataTestId } : {};

  if (filter === str) {
    return (
      <span className={classes} data-test-id={dataTestId}>
        {str}
      </span>
    );
  }
  const regexp = new RegExp(filter, 'ig');
  const matchValue = str.match(regexp);

  if (matchValue) {
    return (
      <React.Fragment>
        {str.split(regexp).map((s, index, array) => {
          if (index < array.length - 1) {
            const c = matchValue.shift();

            return (
              <span key={String(index) + s} {...prop}>
                {s}
                <span className={classes} data-test-id={dataTestId}>
                  {c}
                </span>
              </span>
            );
          }

          return <span key={String(index) + s}>{s}</span>;
        })}
      </React.Fragment>
    );
  }

  return <span>{str}</span>;
};

export { Hightlight };
