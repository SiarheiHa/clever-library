import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useGetBookByIdQuery } from '../../api';
import { useGetCurrentUserQuery } from '../../api/current-user-api';
import coverPlaceHolder from '../../assets/images/cat.svg';
import { hideLoader, showLoader, showToast, useAppDispatch } from '../../store';
import { getCoverURItoFirebase, getURI } from '../../utils';
import { BookButton } from '../book-button';
import { BookingModal } from '../booking-modal';
import { Button } from '../button';
import { CommentsBlock } from '../comments-block';
import { Container } from '../container';
import { DetailInfo } from '../detail-info';
import { InfoBlock } from '../info-block';
import { Rating } from '../rating';
import { ReviewModal } from '../review-modal';
import { Slider } from '../slider';

import styles from './book-info.module.scss';

const BookInfo = () => {
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  const bookId = useParams()?.bookId as string;
  const { data: book, error, isLoading, isFetching, isSuccess } = useGetBookByIdQuery(bookId);

  const dispatch = useAppDispatch();

  const { data: userInfo } = useGetCurrentUserQuery('1');
  const enableHideLoaderRef = useRef(true);

  useEffect(() => {
    if (isLoading) {
      enableHideLoaderRef.current = true;
      // dispatch(showLoader());
    } else if (isSuccess && !isFetching && enableHideLoaderRef.current) {
      // console.log('isSuccess && !isFetching && enableHideLoaderRef.current');
      // console.log(2);
      // dispatch(hideLoader());
    }
  }, [book, dispatch, isFetching, isLoading, isSuccess]);

  useEffect(() => {
    if (error && !isLoading) {
      // console.log(3);
      // dispatch(hideLoader());
      dispatch(
        showToast({ mode: 'warning', message: 'Что-то пошло не так. Обновите страницу через некоторое время.' })
      );
    }
  }, [error, dispatch, isLoading]);

  if (!book || error) {
    return null;
  }

  const openReviewModal = () => {
    setReviewModalOpen(true);
  };

  const closeReviewModal = () => {
    setReviewModalOpen(false);
  };

  const openBookingModal = () => {
    setBookingModalOpen(true);
  };

  const closeBookingModal = () => {
    setBookingModalOpen(false);
  };

  const { authors, comments, description, images, title, issueYear, rating, id } = book;

  const commentsForRender = comments?.length
    ? [...comments].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    : [];

  const hasCurrentUserComment = () => {
    if (!comments || !userInfo?.id) {
      return false;
    }

    return comments.some(({ user }) => String(user.commentUserId) === userInfo?.id);
  };

  const imagesSrcArr = images && images.length ? images.map(() => getCoverURItoFirebase(id)) : [coverPlaceHolder];

  return (
    <Container>
      <div className={styles.wrapper}>
        <div className={styles.info}>
          <Slider arrOfPaths={imagesSrcArr} placeholder={!(images && images.length)} />
          <div className={styles.info__wrapper}>
            <div className={styles.main_info}>
              <h3 className={styles.title} data-test-id='book-title'>
                {title}
              </h3>
              <p className={styles.subtitle}>
                {/* эта проверка только для тестов, когда вместо книги приходит массив книг */}
                {authors && `${authors.join('. ')}, ${issueYear}`}
              </p>
              <BookButton book={book} onClick={openBookingModal} className={styles.button} />
            </div>

            <div className={styles.description}>
              <h4 className={styles.description__title}>О книге</h4>
              {description &&
                description.split('\n').map((text, i) => {
                  if (!text) {
                    return null;
                  }

                  return (
                    <p key={String(i) + text[0]} className={styles.description__p}>
                      {text}
                    </p>
                  );
                })}
            </div>
          </div>
        </div>

        <InfoBlock title='Рейтинг'>
          <Rating value={rating || 0} detail={true} starsize='xl' className={styles.rating} />
        </InfoBlock>

        <InfoBlock title='Подробная информация'>
          <DetailInfo book={book} />
        </InfoBlock>
        <div data-test-id='reviews'>
          <InfoBlock title='Отзывы' badge={String(comments?.length || 0)} dropdown={true} className={styles.comments}>
            <CommentsBlock comments={commentsForRender} />
          </InfoBlock>
          <Button
            disabled={hasCurrentUserComment()}
            contained={!hasCurrentUserComment()}
            bordered={false}
            shadowed={false}
            className={styles.button_review}
            onClick={openReviewModal}
            testId='button-rate-book'
          >
            ОЦЕНИТЬ КНИГУ
          </Button>
        </div>
      </div>
      {reviewModalOpen && userInfo && (
        <ReviewModal
          bookId={id}
          isOpen={reviewModalOpen}
          onClose={closeReviewModal}
          user={userInfo}
          enableHideLoaderRef={enableHideLoaderRef}
        />
      )}
      {bookingModalOpen && (
        <BookingModal book={book} isOpen={bookingModalOpen} onClose={closeBookingModal} userId={Number(userInfo?.id)} />
      )}
    </Container>
  );
};

export { BookInfo };
