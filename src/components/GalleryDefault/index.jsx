import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import styles from './GalleryDefault.module.scss';
import SliderPagination from '../../ui/SliderPagination';
import { NavBtnNext, NavBtnPrev } from '../../ui/NavBtns';
import { GalleryModalDefault } from '../../ModalsMain/GalleryModal';

const GalleryDefaultLayout = ({ images = [], containerClassName = '', onClickContainer = () => {} }) => {
   const [activeSlideIndex, setActiveSlideIndex] = useState(0);

   const onClideChangeHandler = e => {
      setActiveSlideIndex(e.activeIndex);
   };

   return (
      <div className={styles.GalleryDefaultRoot}>
         <Swiper
            slidesPerView={1}
            modules={[Navigation, Pagination]}
            navigation={{
               prevEl: '.slider-btn-prev',
               nextEl: '.slider-btn-next',
            }}
            onClick={onClickContainer}
            onSlideChange={onClideChangeHandler}
            className={`${styles.GalleryDefaultImages} ${containerClassName} cursor-pointer`}>
            {images.map((image, index) => {
               return (
                  <SwiperSlide key={index}>
                     <img src={image} className={styles.GalleryDefaultImage} alt="" />
                  </SwiperSlide>
               );
            })}
            <SliderPagination current={activeSlideIndex} total={images.length} />
            <NavBtnPrev centery="true" disabled className="slider-btn-prev"></NavBtnPrev>
            <NavBtnNext centery="true" className="slider-btn-next"></NavBtnNext>
         </Swiper>
      </div>
   );
};

const GalleryDefault = ({ images = [], containerClassName = '' }) => {
   const [isOpenModal, setIsOpenModal] = useState(false);
   return (
      <>
         <GalleryDefaultLayout images={images} containerClassName={containerClassName} onClickContainer={() => setIsOpenModal(true)} />
         <GalleryModalDefault condition={isOpenModal} set={setIsOpenModal}>
            <div className="grid grid-cols-[1fr_25%] gap-x-5">
               <GalleryDefaultLayout images={images} />
               <div>sidebar</div>
            </div>
         </GalleryModalDefault>
      </>
   );
};

export default GalleryDefault;
