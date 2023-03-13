import React from 'react';

import styles from './hightligh.module.scss';

interface HightlightProps {
  filter: string;
  str: string;
  testId?: string;
}

const Hightlight: React.FC<HightlightProps> = ({ filter, str, testId }) => {
  if (!filter) return <span>{str}</span>;
  const dataTestId = testId || 'highlight-matches';

  if (filter === str) {
    return (
      <span className={styles.hightlight} data-test-id={dataTestId}>
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
              <span key={String(index) + s} data-test-id={dataTestId}>
                {s}
                <span className={styles.hightlight} data-test-id={dataTestId}>
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
