import { useLocation } from 'react-router-dom';

import coverPlaceHolder from '../../assets/images/cat.svg';
import { BOOKS_MOCK, DESCRIPTION_1_MOCK, DESCRIPTION_2_MOCK, REVIEWS_MOCK } from '../../data';
import { Book, Review } from '../../types/types';
import { BookButton } from '../book-button';
import { Button } from '../button';
import { Container } from '../container';
import { DetailInfo } from '../detail-info';
import { InfoBlock } from '../info-block';
import { Rating } from '../rating';
import { Reviews } from '../reviews';
import { Slider } from '../slider';

import styles from './book-info.module.scss';

const BookInfo = () => {
  const { pathname } = useLocation();
  const arr = pathname.split('/');
  const bookId = arr.at(-1);
  const book = BOOKS_MOCK.find(({ id }) => id === bookId) as Book;

  const { author, cover, images, title, year, rating } = book;

  const coverSrc = cover || coverPlaceHolder;

  const reviews: Review[] = rating ? REVIEWS_MOCK : [];

  return (
    <Container>
      <div className={styles.wrapper}>
        <div className={styles.info}>
          <Slider arrOfPaths={[coverSrc, ...images]} />
          <div className={styles.info__wrapper}>
            <div className={styles.main_info}>
              <h3 className={styles.title}>{title}</h3>
              <p className={styles.subtitle}>
                {author}, {year}
              </p>
              <BookButton book={book} onClick={() => {}} className={styles.button} />
            </div>

            <div className={styles.description}>
              <h4 className={styles.description__title}>О книге</h4>
              <p className={styles.description__p}>{DESCRIPTION_1_MOCK}</p>
              <p className={styles.description__p}>{DESCRIPTION_2_MOCK}</p>
            </div>
          </div>
        </div>

        <InfoBlock title='Рейтинг'>
          <Rating value={book.rating} detail={true} starsize='xl' className={styles.rating} />
        </InfoBlock>

        <InfoBlock title='Подробная информация'>
          <DetailInfo book={book} />
        </InfoBlock>

        <InfoBlock title='Отзывы' badge={String(reviews.length)} dropdown={true} className={styles.reviews}>
          <Reviews reviews={reviews} />
        </InfoBlock>
        <Button
          contained={true}
          bordered={false}
          shadowed={false}
          className={styles.button_review}
          onClick={() => {}}
          testId='button-rating'
        >
          ОЦЕНИТЬ КНИГУ
        </Button>
      </div>
    </Container>
  );
};

export { BookInfo };
