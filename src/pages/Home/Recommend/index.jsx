import React from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import TitleIcon from '../TitleIcon';
import { IconStar } from '../../../ui/Icons';

import { NavBtnNext, NavBtnPrev } from '../../../ui/NavBtns';
import Tabs from '../../../ui/Tabs';

import CardSecond from '../../../ui/CardSecond';

const Recommend = ({ data }) => {
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
            }}
            className="md1:px-4 md1:-mx-4">
            {data.map(item => {
               return (
                  <SwiperSlide key={item.id}>
                     <CardSecond {...item} />
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
         name: 'Новостройки',
         body: <StocksTabBody1 />,
      },
      {
         name: 'Вторичка',
         body: <div>2</div>,
      },
      {
         name: 'Дом, коттедж',
         body: <StocksTabBody1 />,
      },
   ];

   return (
      <div className="white-block white-block-home">
         <TitleIcon icon={<IconStar width={24} height={24} />} text="Определенно рекомендуем" />
         <Tabs data={dataTabs} />
      </div>
   );
};

export default Recommend;
