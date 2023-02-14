import { BookInfo } from '../../components/book-info';
import { Breadcrumbs } from '../../components/breadcrumbs';
import { Main } from '../../components/main';

import styles from './book.module.scss';

export const BookPage = () => (
  <Main direction='column' className={styles.main}>
    <Breadcrumbs />
    <BookInfo />
  </Main>
);
