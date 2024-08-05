import React from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import TitleIcon from '../TitleIcon';
import { IconStorm } from '../../../ui/Icons';

import { NavBtnNext, NavBtnPrev } from '../../../ui/NavBtns';
import Tabs from '../../../ui/Tabs';
import CardStock from '../../../ui/CardStock';

const Stocks = ({data}) => {
   const StocksTabBody1 = () => {
      return (
         <Swiper
            modules={[Navigation]}
            slidesPerView={data.length > 1 ? 1.05 : 1}
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
                  slidesPerView: 3,
                  spaceBetween: 24,
               },
            }} className="md1:px-4 md1:-mx-4">
            {data.map((item, index) => {
               return (
                  <SwiperSlide key={index}>
                     <CardStock {...item} key={index} />
                  </SwiperSlide>
               );
            })}
            <NavBtnPrev disabled className="slider-btn-prev !absolute top-[95px] left-4"></NavBtnPrev>
            <NavBtnNext className="slider-btn-next !absolute top-[95px] right-4"></NavBtnNext>
         </Swiper>
      );
   };
   const StocksTabBody2 = () => {
      return (
         <Swiper
            modules={[Navigation]}
            slidesPerView={3}
            navigation={{
               prevEl: '.slider-btn-prev',
               nextEl: '.slider-btn-next',
            }}
            spaceBetween={24}>
            {data.map((item, index) => {
               return (
                  <SwiperSlide key={index}>
                     <CardStock {...item} key={index} />
                  </SwiperSlide>
               );
            })}
            <NavBtnPrev disabled className="slider-btn-prev !absolute top-[95px] left-4"></NavBtnPrev>
            <NavBtnNext className="slider-btn-next !absolute top-[95px] right-4"></NavBtnNext>
         </Swiper>
      );
   };

   const dataTabs = [
      {
         name: 'Акции',
         body: <StocksTabBody1 />,
      },
      {
         name: 'Расчёты',
         body: <StocksTabBody2 />,
      },
   ];

   return (
      <div className="white-block white-block-home">
         <TitleIcon icon={<IconStorm width={24} height={24} />} text="Акции и расчёты в новостройках" link={{ href: '#', name: 'Смотреть всё' }} />
         <Tabs data={dataTabs} />
      </div>
   );
};

export default Stocks;
