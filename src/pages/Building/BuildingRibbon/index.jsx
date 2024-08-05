import React, { useContext } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import styles from './BuildingRibbon.module.scss';
import Tabs from '../../../ui/Tabs';
import { BuildingContext } from '..';
import CardStock from '../../../ui/CardStock';
import { NavBtnNext, NavBtnPrev } from '../../../ui/NavBtns';
import Button from '../../../uiForm/Button';

const BuildingRibbon = () => {   
   const { stock, calculations } = useContext(BuildingContext);
   const promoItems = [...stock, ...calculations];

   const PromoBody = () => {
      return (
         <div className="w-full min-w-0">
            <Swiper
               modules={[Navigation]}
               slidesPerView={1}
               navigation={{
                  prevEl: '.slider-btn-prev',
                  nextEl: '.slider-btn-next',
               }}
               spaceBetween={16}
               breakpoints={{
                  768: {
                     slidesPerView: 2,
                     spaceBetween: 24,
                  },
                  1222: {
                     slidesPerView: `${promoItems.length === 1 ? 1 : 2}`,
                     spaceBetween: 24,
                  },
               }}>
               {promoItems.map((item, index) => (
                  <SwiperSlide key={index}>
                     <CardStock {...item} />
                  </SwiperSlide>
               ))}
               <NavBtnPrev disabled className="slider-btn-prev !absolute top-[95px] left-4"></NavBtnPrev>
               <NavBtnNext className="slider-btn-next !absolute top-[95px] right-4"></NavBtnNext>
            </Swiper>
            <Button variant="secondary" className="w-full mt-6" Selector="a" href="#">
               Смотреть всё
            </Button>
         </div>
      );
   };

   const VideoBody = () => {
      return (
         <div className="w-full min-w-0">
            124
         </div>
      );
   };

   const tabsData = [
      {
         name: 'Акции и расчеты',
         body: <PromoBody />,
      },
      {
         name: 'Видео и Shorts',
         body: <VideoBody />,
      },
   ];

   return (
      <div className="white-block">
         <h2 className="title-2 mb-4">Лента</h2>
         <Tabs data={tabsData} />
      </div>
   );
};

export default BuildingRibbon;
