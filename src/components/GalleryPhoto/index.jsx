import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import styles from './GalleryPhoto.module.scss';
import { NavBtnNext, NavBtnPrev } from '../../ui/NavBtns';
import SliderPagination from '../../ui/SliderPagination';
import GalleryModal from '../../ModalsMain/GalleryModal';

export const GalleryPhoto = ({ data, containerClassName = '', variant = 'default', allData = [] }) => {
   const { price, distance } = data;
   const currentTag = price || distance || null;
   const [activeSlideIndex, setActiveSlideIndex] = useState(0);
   const [isOpenModal, setIsOpenModal] = useState(false);

   const onClideChangeHandler = e => {
      setActiveSlideIndex(e.activeIndex);
   };

   return (
      <Swiper
         slidesPerView={1}
         modules={[Navigation, Pagination]}
         navigation={{
            prevEl: '.slider-btn-prev',
            nextEl: '.slider-btn-next',
         }}
         onSlideChange={onClideChangeHandler}
         onClick={() => {
            if (variant === 'modal') {
               setIsOpenModal(true);
            }
         }}
         className={`${styles.GalleryPhotoImages} ${containerClassName} cursor-pointer`}>
         {data.images.map((image, index) => {
            return (
               <SwiperSlide key={index}>
                  <img src={image} className={styles.GalleryPhotoImage} alt="" />
               </SwiperSlide>
            );
         })}
         <SliderPagination current={activeSlideIndex} total={data.images.length} />
         <NavBtnPrev centery="true" disabled className="slider-btn-prev"></NavBtnPrev>
         <NavBtnNext centery="true" className="slider-btn-next"></NavBtnNext>
         {currentTag && <div className={styles.GalleryPhotoTag}>{currentTag}</div>}
         <GalleryModal condition={isOpenModal} set={setIsOpenModal} data={allData || data} sidebar={<div>тут будет sidebar</div>} />
      </Swiper>
   );
};

export default GalleryPhoto;
