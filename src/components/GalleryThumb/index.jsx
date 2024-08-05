import React, { useState, useContext, useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Mousewheel } from 'swiper/modules';

import styles from './GalleryThumb.module.scss';
import { BuildingContext } from '../../pages/Building';
import { NavBtnNext, NavBtnPrev } from '../../ui/NavBtns';
import GalleryModal from '../../ModalsMain/GalleryModal';
import SliderPagination from '../../ui/SliderPagination';
import FullscreenBtn from '../../ui/FullscreenBtn';
import { useSelector } from 'react-redux';

const GalleryThumb = () => {
   const { isDesktop } = useSelector(state => state.windowSize);

   const { gallery } = useContext(BuildingContext);

   const [isOpenModal, setIsOpenModal] = useState(false);

   const newGallery = gallery.map((item, index) => {
      return { ...item, id: index };
   });
   const [activeThumbIndex, setActiveThumbIndex] = useState(0);

   const [activeSlideIndex, setActiveSlideIndex] = useState(0);
   const totalSlides = newGallery.reduce((acc, item) => {
      return (acc += item.images.length);
   }, 0);
   
   const mainSwiperRef = useRef(null);
   const thumbsSwiperRef = useRef(null);

   const handleThumbClick = index => {
      let currentIndex = 0;

      newGallery.forEach(item => {
         if (index >= item.id && item.id !== index) {
            currentIndex += item.images.length;
         }
      });

      if (mainSwiperRef.current && mainSwiperRef.current.swiper) {
         mainSwiperRef.current.swiper.slideTo(currentIndex);
      }
   };

   const onClideChangeHandler = () => {
      const swiperEl = mainSwiperRef.current.swiper;
      const currentEl = swiperEl.slides[swiperEl.activeIndex];
      setActiveSlideIndex(swiperEl.activeIndex);
      setActiveThumbIndex(+currentEl.dataset.galleryGroupIndex);
   };

   useEffect(() => {
      if (!thumbsSwiperRef.current) return;
      thumbsSwiperRef.current.swiper.slideTo(activeThumbIndex);
   }, [activeThumbIndex]);

   return (
      <div className={styles.GalleryThumbRoot}>
         <Swiper
            slidesPerView={1}
            modules={[Navigation]}
            navigation={{
               prevEl: '.slider-btn-prev',
               nextEl: '.slider-btn-next',
            }}
            ref={mainSwiperRef}
            onSlideChange={onClideChangeHandler}
            className="w-full cursor-pointer gallery-target-modal"
            onClick={() => setIsOpenModal(true)}>
            {newGallery.map((galleryItem, galleryItemIndex) => {
               return galleryItem.images.map((image, index) => {
                  return (
                     <SwiperSlide data-gallery-group-index={galleryItemIndex} data-gallery-item-index={index} className="h-full" key={index}>
                        <img src={image} alt="" className={styles.GalleryThumbMainImage} />
                     </SwiperSlide>
                  );
               });
            })}
            <SliderPagination current={activeSlideIndex} total={totalSlides} />
            <div className="nav-btns-bottom-right">
               <NavBtnPrev disabled className="slider-btn-prev"></NavBtnPrev>
               <NavBtnNext className="slider-btn-next"></NavBtnNext>
            </div>
            <FullscreenBtn onClick={() => setIsOpenModal(true)} />
         </Swiper>
         {isDesktop && (
            <Swiper
               slidesPerView={newGallery.length > 2 ? 2.4 : newGallery.length}
               spaceBetween={12}
               modules={[Navigation, Mousewheel]}
               direction="vertical"
               watchSlidesProgress
               ref={thumbsSwiperRef}
               navigation={{
                  prevEl: '[data-gallery-thums-prev]',
                  nextEl: '[data-gallery-thums-next]',
               }}
               mousewheel={true}
               className="w-full rounded-xl">
               {newGallery.map((item, index) => {
                  return (
                     <SwiperSlide
                        onClick={() => handleThumbClick(index)}
                        key={item.name}
                        className={`relative ${activeThumbIndex === index ? '_active' : ''}`}>
                        <div className={styles.GalleryThumbOverlayName}>
                           <span>{item.name}</span>
                        </div>
                        <img src={item.images[0]} alt="" className={styles.GalleryThumbMainImage} />
                     </SwiperSlide>
                  );
               })}

               <NavBtnPrev data-gallery-thums-prev disabled className={styles.GalleryThumbPrev}></NavBtnPrev>
               <NavBtnNext data-gallery-thums-next className={styles.GalleryThumbNext}></NavBtnNext>
            </Swiper>
         )}
         <GalleryModal condition={isOpenModal} set={setIsOpenModal} data={newGallery} sidebar={<div>тут будет sidebar</div>} />
      </div>
   );
};

export default GalleryThumb;
