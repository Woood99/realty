import React, { useState, useEffect } from 'react';

import styles from './CardGallery.module.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const CardGallery = ({ images, title, href = '#', className = '' }) => {
   const { isDesktop } = useSelector(state => state.windowSize);

   return (
      <>
         {isDesktop ? (
            <Desktop images={images} title={title} className={className} href={href} />
         ) : (
            <Mobile images={images} title={title} href={href} />
         )}
      </>
   );
};

const Desktop = ({ images, title, href, className = '' }) => {
   const { isDesktop } = useSelector(state => state.windowSize);
   
   const [activeImageIndex, setActiveImageIndex] = useState(0);
   const handleMouseEnter = index => {
      if (!isDesktop) return;
      if (index !== undefined) {
         setActiveImageIndex(index);
      }
   };
   return (
      <Link to={href} className={`${styles.CardGalleryTop} ${className}`}>
         <div className={styles.CardGalleryImages}>
            {images.map((image, index) => {
               if (index < 3) {
                  return (
                     <div key={index} className={styles.CardGalleryImageWrapper} onMouseEnter={() => handleMouseEnter(index)}>
                        <div className={styles.CardGalleryImage}>
                           <img src={image} alt={title} />
                        </div>
                     </div>
                  );
               }
            })}
            {images.length >= 3 && (
               <div className={styles.CardGalleryImageWrapper} onMouseEnter={() => handleMouseEnter()}>
                  <div className={styles.CardGalleryImage}>
                     <div className={styles.CardGalleryMore}>Показать ещё {images.length - 3} фото</div>
                     <img src={images[0]} alt={title} />
                  </div>
               </div>
            )}
            <div className={styles.CardGalleryPagination}>
               {images.map((_, index) => {
                  if (index < 3) {
                     return (
                        <span
                           className={`${styles.PaginationItem} ${activeImageIndex === index ? styles.PaginationItemActive : ''}`}
                           key={index}></span>
                     );
                  }
               })}
            </div>
         </div>
      </Link>
   );
};

const Mobile = ({ images, title, href }) => {
   return (
      <Link to={href} className={styles.CardGalleryTop}>
         <Swiper className={`${styles.CardGalleryImages} CardGallerySwiper`} slidesPerView={1} spaceBetween={0}>
            {images.map((image, index) => {
               return (
                  <SwiperSlide key={index} className={styles.CardGalleryImageWrapper}>
                     <div className={styles.CardGalleryImage}>
                        <img src={image} alt={title} />
                     </div>
                  </SwiperSlide>
               );
            })}
         </Swiper>
      </Link>
   );
};

export default CardGallery;
