/* eslint-disable simple-import-sort/imports */
/* eslint-disable react/no-array-index-key */
import { useState } from 'react';
import SwiperClass from 'swiper/types/swiper-class';
import { Navigation, Pagination, Scrollbar, Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import classNames from 'classnames';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import styles from './slider.module.scss';

interface SliderProps {
  arrOfPaths: string[];
  placeholder: boolean;
}

const Slider = ({ arrOfPaths, placeholder }: SliderProps) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass>();
  const classes = classNames(styles.slide, placeholder && styles.placeholder);

  return (
    <div className={styles.container}>
      <Swiper
        className={styles.slidertop}
        modules={[Navigation, Pagination, Scrollbar, Thumbs]}
        spaceBetween={0}
        slidesPerView={1}
        pagination={{
          clickable: true,
          horizontalClass: styles.pagination,
          bulletActiveClass: styles.bullet_active,
        }}
        grabCursor={true}
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        data-test-id='slide-big'
      >
        {arrOfPaths.map((path, i) => (
          <SwiperSlide key={i} className={classes}>
            <img src={path} alt='preview' className={styles.cover} />
          </SwiperSlide>
        ))}
      </Swiper>

      {arrOfPaths.length > 1 && (
        <Swiper
          className={styles.sliderbottom}
          modules={[Navigation, Pagination, Scrollbar]}
          spaceBetween={30}
          slidesPerView={5}
          centerInsufficientSlides={true}
          scrollbar={{
            draggable: true,
            hide: true,
            dragSize: 190,
            horizontalClass: styles.scrollbar,
          }}
          onSwiper={setThumbsSwiper}
        >
          {arrOfPaths.map((path, i) => (
            <SwiperSlide key={i} data-test-id='slide-mini'>
              <img src={path} alt='preview' className={styles.cover} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export { Slider };
