import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import Button from '../../../uiForm/Button';

import styles from './BannerMain.module.scss';
import { NavBtnPrev, NavBtnNext } from '../../../ui/NavBtns';

const BannerMain = ({ items }) => {
   return (
      <Swiper
         modules={[Navigation, Pagination, Autoplay]}
         slidesPerView={1}
         pagination={{ clickable: true }}
         navigation={{
            prevEl: '.slider-btn-prev',
            nextEl: '.slider-btn-next',
         }}
         watchSlidesProgress={true}
         spaceBetween={24}
         autoplay={{
            delay: 7000,
            disableOnInteraction: false,
         }}
         className={`${styles.slider} swiper-progress-autoplay`}>
         {items.map((item, index) => {
            return (
               <SwiperSlide key={index} className={styles.slide} style={{ backgroundImage: `url(${item.imageUrl})` }}>
                  <a href={item.link} className={styles.wrapper}>
                     <div className={styles.content}>
                        <h2 className="title-2">{item.title}</h2>
                        <p className={styles.descr}>{item.descr}</p>
                        <Button Selector="div" variant="primary" className={styles.button}>
                           Подробнее
                        </Button>
                     </div>
                  </a>
               </SwiperSlide>
            );
         })}
         <div className="nav-btns-bottom-right">
            <NavBtnPrev disabled className="slider-btn-prev"></NavBtnPrev>
            <NavBtnNext className="slider-btn-next"></NavBtnNext>
         </div>
      </Swiper>
   );
};

export default BannerMain;
