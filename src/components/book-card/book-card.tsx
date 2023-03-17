import { useState } from 'react';
import classNames from 'classnames';

import coverPlaceHolder from '../../assets/images/cat.svg';
import { selectSearchString, selectUserState, useAppSelector } from '../../store';
import { Book } from '../../types/types';
import { getURI } from '../../utils';
import { BookButton } from '../book-button';
import { BookingModal } from '../booking-modal';
import { Hightlight } from '../hightlight';
import { Rating } from '../rating';

import styles from './book-card.module.scss';

interface BookCardProps {
  book: Book;
  variant: 'small' | 'large';
}

const BookCard: React.FC<BookCardProps> = ({ book, variant }) => {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const { userInfo } = useAppSelector(selectUserState);

  const openBookingModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    console.log(book);
    setBookingModalOpen(true);
  };

  const closeBookingModal = () => {
    setBookingModalOpen(false);
  };

  const searchString = useAppSelector(selectSearchString);
  const { authors, image, rating, title, issueYear } = book;

  const cardClasses = classNames(styles.card, styles[variant]);

  const imgSrc = image?.url ? getURI(image.url) : coverPlaceHolder;

  return (
    <div className={cardClasses} data-test-id='card'>
      <div className={styles.img_wrapper}>
        <img src={imgSrc} alt='cover' className={styles.cover} />
      </div>
      <div className={styles.flex}>
        <Rating value={rating || 0} starsize={variant === 'large' ? 'm' : 'l'} />
        <div className={styles.description}>
          <p className={styles.title}>
            <Hightlight str={title} filter={searchString} />
          </p>
          <p className={styles.subtitle}>
            {authors.join(', ')}, {issueYear}
          </p>
        </div>
        <BookButton onClick={openBookingModal} className={styles.button} book={book} />
      </div>
      {bookingModalOpen && (
        <BookingModal
          book={book}
          isOpen={bookingModalOpen}
          onClose={closeBookingModal}
          userId={userInfo?.user ? userInfo.user?.id : 0}
        />
      )}
    </div>
  );
};

export { BookCard };
