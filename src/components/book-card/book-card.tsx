import classNames from 'classnames';

import coverPlaceHolder from '../../assets/images/cat.svg';
import { Book } from '../../types/types';
import { getURI, truncateText } from '../../utils';
import { BookButton } from '../book-button';
import { Rating } from '../rating';

import styles from './book-card.module.scss';

interface BookCardProps {
  book: Book;
  variant: 'small' | 'large';
}

const BookCard: React.FC<BookCardProps> = ({ book, variant }) => {
  const { authors, image, rating, title, issueYear } = book;

  const cardClasses = classNames(styles.card, styles[variant]);

  const imgSrc = image?.url ? getURI(image.url) : coverPlaceHolder;
  const titleForRender = variant === 'large' ? title : truncateText(title, 54);

  return (
    <div className={cardClasses} data-test-id='card'>
      <div className={styles.img_wrapper}>
        <img src={imgSrc} alt='cover' className={styles.cover} />
      </div>
      <div className={styles.flex}>
        <Rating value={rating || 0} starsize={variant === 'large' ? 'm' : 'l'} />
        <div className={styles.description}>
          <p className={styles.title}>{titleForRender}</p>
          <p className={styles.subtitle}>
            {authors.join(', ')}, {issueYear}
          </p>
        </div>
        <BookButton onClick={() => {}} className={styles.button} book={book} />
      </div>
    </div>
  );
};

export { BookCard };
