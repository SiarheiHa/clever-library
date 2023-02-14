import { Link, useParams } from 'react-router-dom';

import { BOOKS_MOCK } from '../../data';
import { CATEGORIES_MOCK } from '../../mocks';
import { Container } from '../container';

import styles from './breadcrumbs.module.scss';

const Breadcrumbs = () => {
  const categories = CATEGORIES_MOCK;
  const { category: categoryParam, bookId } = useParams();
  const currentCategory = categories.find((category) => category.path === categoryParam);
  const currentBook = BOOKS_MOCK.find(({ id }) => id === bookId);

  return (
    <div className={styles.background}>
      <Container>
        <div className={styles.crumbs}>
          <Link to={`/books/${categoryParam}`}>{currentCategory?.name}</Link>
          <span className={styles.divider}>/</span>
          <span className={styles.book_name}>{currentBook?.title}</span>
        </div>
      </Container>
    </div>
  );
};

export { Breadcrumbs };
