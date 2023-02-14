import { FC, PropsWithChildren } from 'react';

import styles from './container.module.scss';

const Container: FC<PropsWithChildren> = ({ children }) => <div className={styles.container}>{children}</div>;

export { Container };
