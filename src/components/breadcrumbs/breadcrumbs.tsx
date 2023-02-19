import { Link, useParams } from 'react-router-dom';

import { useGetBookByIdQuery, useGetCategoriesQuery } from '../../api';
import { Container } from '../container';

import styles from './breadcrumbs.module.scss';

const Breadcrumbs = () => {
  const categories = useGetCategoriesQuery('').data ?? [];
  const { category: categoryParam, bookId } = useParams();
  const currentCategory = categories.find((category) => category.path === categoryParam);

  const { data: currentBook } = useGetBookByIdQuery(String(bookId));

  const to = `/books/${categoryParam ?? 'all'}`;

  return (
    <div className={styles.background}>
      <Container>
        <div className={styles.crumbs}>
          <Link to={to}>{currentCategory?.name ?? 'Все книги'}</Link>
          <span className={styles.divider}>/</span>
          <span className={styles.book_name}>{currentBook?.title}</span>
        </div>
      </Container>
    </div>
  );
};

export { Breadcrumbs };
