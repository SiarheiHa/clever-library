import { Link, useLocation } from 'react-router-dom';

import { BOOKS_MOCK, categories } from '../../data';
import { Container } from '../container';

import styles from './breadcrumbs.module.scss';

const Breadcrumbs = () => {
  const { pathname } = useLocation();
  const arr = pathname.split('/');
  const path = arr.at(-2) || 'all';
  const bookId = arr.at(-1);
  const currentCategory = categories.find((category) => category.path.includes(path));
  const currentBook = BOOKS_MOCK.find(({ id }) => id === bookId);

  return (
    <div className={styles.background}>
      <Container>
        <div className={styles.crumbs}>
          <Link to={`/books/${path}`}>{currentCategory?.name}</Link>
          <span className={styles.divider}>/</span>
          <span className={styles.book_name}>{currentBook?.title}</span>
        </div>
      </Container>
    </div>
  );
};

export { Breadcrumbs };
