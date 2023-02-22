import React from 'react';

import styles from './hightligh.module.scss';

interface HightlightProps {
  filter: string;
  str: string;
}

const Hightlight: React.FC<HightlightProps> = ({ filter, str }) => {
  if (!filter) return <span>{str}</span>;
  const regexp = new RegExp(filter, 'ig');
  const matchValue = str.match(regexp);

  if (matchValue) {
    return (
      <React.Fragment>
        {str.split(regexp).map((s, index, array) => {
          if (index < array.length - 1) {
            const c = matchValue.shift();

            return (
              <span key={String(index) + s}>
                {s}
                <span className={styles.hightlight}>{c}</span>
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
