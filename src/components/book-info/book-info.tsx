import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useGetBookByIdQuery } from '../../api';
import coverPlaceHolder from '../../assets/images/cat.svg';
import {
  hideLoader,
  // hideToast,
  selectToastVisibility,
  selectUserState,
  showLoader,
  showToast,
  useAppDispatch,
  useAppSelector,
} from '../../store';
import { getURI } from '../../utils';
import { BookButton } from '../book-button';
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
  const bookId = useParams()?.bookId as string;
  const { data: book, error, isLoading } = useGetBookByIdQuery(bookId);

  const dispatch = useAppDispatch();

  const { userInfo } = useAppSelector(selectUserState);
  const isToastVisible = useAppSelector(selectToastVisibility);

  useEffect(() => {
    if (isLoading) {
      // dispatch(hideToast());
      dispatch(showLoader());
    } else if (book) {
      dispatch(hideLoader());
    }
  }, [book, dispatch, isLoading]);

  useEffect(() => {
    if (error && !isLoading) {
      dispatch(hideLoader());
      showToast({ mode: 'warning', message: 'Что-то пошло не так. Обновите страницу через некоторое время.' });
    } else if (isToastVisible) {
      // dispatch(hideToast());
    }
  }, [error, dispatch, isToastVisible, isLoading]);

  if (!book || error) {
    return null;
  }

  const openReviewModal = () => {
    setReviewModalOpen(true);
  };

  const closeReviewModal = () => {
    setReviewModalOpen(false);
  };

  const { authors, comments, description, images, title, issueYear, rating, id } = book;

  const commentsForRender = comments?.length
    ? [...comments].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    : [];

  const hasCurrentUserComment = () => {
    if (!comments || !userInfo?.user) {
      return false;
    }

    return comments.some(({ user }) => user.commentUserId === userInfo.user?.id);
  };

  const imagesSrcArr = images && images.length ? images.map((img) => getURI(img.url)) : [coverPlaceHolder];

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
                {authors.join('. ')}, {issueYear}
              </p>
              <BookButton book={book} onClick={() => {}} className={styles.button} />
            </div>

            <div className={styles.description}>
              <h4 className={styles.description__title}>О книге</h4>
              {description.split('\n').map((text, i) => {
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
          testId='button-rating'
        >
          ОЦЕНИТЬ КНИГУ
        </Button>
      </div>
      <ReviewModal
        bookId={id}
        isOpen={reviewModalOpen}
        onClose={closeReviewModal}
        userId={userInfo?.user ? userInfo.user?.id : 0}
      />
    </Container>
  );
};

export { BookInfo };
