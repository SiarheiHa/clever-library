import { useState } from 'react';
import classNames from 'classnames';

import { useGetCurrentUserQuery } from '../../api/current-user-api';
import coverPlaceHolder from '../../assets/images/cat.svg';
import { selectSearchString, useAppSelector } from '../../store';
import { Book } from '../../types/types';
import { getCoverURItoFirebase, getURI } from '../../utils';
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
  const { data: userInfo } = useGetCurrentUserQuery('1');

  const openBookingModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setBookingModalOpen(true);
  };

  const closeBookingModal = () => {
    setBookingModalOpen(false);
  };

  const searchString = useAppSelector(selectSearchString);
  const { authors, image, rating, title, issueYear, id } = book;

  const cardClasses = classNames(styles.card, styles[variant]);

  // const imgSrc = image?.url ? getURI(image.url) : coverPlaceHolder;
  const imgSrc = image?.url ? getCoverURItoFirebase(id) : coverPlaceHolder;

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
        <BookingModal book={book} isOpen={bookingModalOpen} onClose={closeBookingModal} userId={Number(userInfo?.id)} />
      )}
    </div>
  );
};

export { BookCard };
