import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import numberReplace from '../../../helpers/numberReplace';
import { IconArrowY } from '../../../ui/Icons';

import styles from './RoomInfo.module.scss';
import { NavBtnNext, NavBtnPrev } from '../../../ui/NavBtns';
import CardScheme from '../../../ui/CardScheme';
import RoomInfoCard from '../RoomInfoCard';

const RoomInfo = ({ apartment, onClick, active }) => {
   const [roomItemsIndex, setRoomItemsIndex] = useState(null);

   const onClickHandler = index => {
      if (roomItemsIndex === index) {
         setRoomItemsIndex(null);
      } else {
         setRoomItemsIndex(index);
      }
   };

   return (
      <div>
         <button onClick={onClick} key={apartment.room} className={styles.RoomInfoRoot}>
            <div className="title-3">{apartment.room === 0 ? 'Студии' : `${apartment.room}-комнатные`}</div>
            <div>от {apartment.minArea} м²</div>
            <div className="title-3">от {numberReplace(apartment.minPrice)} ₽</div>
            <div className={styles.RoomInfoAttr}>
               <span>{apartment.totalLayout} планировок</span>
               <span>{apartment.totalApartment} квартир</span>
            </div>
            <IconArrowY width={25} height={25} className={`fill-black ${styles.RoomInfoIcon}`} />
         </button>
         {active && (
            <Swiper
               className="mt-4"
               modules={[Navigation]}
               slidesPerView={2.7}
               navigation={{
                  prevEl: '.slider-btn-prev',
                  nextEl: '.slider-btn-next',
               }}
               spaceBetween={16}>
               {apartment.layouts.map((item, index) => {
                  return (
                     <SwiperSlide key={index}>
                        <CardScheme
                           data={item}
                           onClick={() => {
                              onClickHandler(index);
                           }}
                           room={apartment.room}
                        />
                     </SwiperSlide>
                  );
               })}
               <div>
                  <NavBtnPrev disabled className="slider-btn-prev"></NavBtnPrev>
                  <NavBtnNext className="slider-btn-next"></NavBtnNext>
               </div>
            </Swiper>
         )}
         {apartment.layouts[roomItemsIndex] ? (
            <div className='mt-4'>
               {apartment.layouts[roomItemsIndex].layoutItems.map((item, index) => {
                  return (
                     <RoomInfoCard key={index} data={item} room={apartment.room}/>
                  );
               })}
            </div>
         ) : (
            ''
         )}
      </div>
   );
};

export default RoomInfo;
