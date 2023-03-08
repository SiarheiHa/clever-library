import React from 'react';

import styles from './hightligh.module.scss';

interface HightlightProps {
  filter: string;
  str: string;
}

const Hightlight: React.FC<HightlightProps> = ({ filter, str }) => {
  console.log(filter, str);
  if (!filter) return <span>{str}</span>;
  if (filter === str) {
    return (
      <span className={styles.hightlight} data-test-id='highlight-matches'>
        {str}
      </span>
    );
  }
  const regexp = new RegExp(filter, 'ig');
  const matchValue = str.match(regexp);

  console.log(matchValue);

  if (matchValue) {
    return (
      <React.Fragment>
        {str.split(regexp).map((s, index, array) => {
          if (index < array.length - 1) {
            const c = matchValue.shift();

            return (
              <span key={String(index) + s}>
                {s}
                <span className={styles.hightlight} data-test-id='highlight-matches'>
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
