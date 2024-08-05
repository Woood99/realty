import React from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import TitleIcon from '../TitleIcon';
import { IconFire } from '../../../ui/Icons';

import CardPrimary from '../../../ui/CardPrimary';
import BannerInfo from '../../../components/BannerInfo';
import Button from '../../../uiForm/Button';
import { NavBtnNext, NavBtnPrev } from '../../../ui/NavBtns';

const Cashback = ({ data }) => {
   return (
      <>
         <div className="white-block white-block-home">
            <TitleIcon icon={<IconFire width={24} height={24} />} text="Мега кэшбэк" />
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
               {data.map((item, index) => {
                  return (
                     <SwiperSlide key={index}>
                        <CardPrimary {...item} className="h-full" />
                     </SwiperSlide>
                  );
               })}
               <NavBtnPrev disabled className="slider-btn-prev !absolute top-[95px] left-4"></NavBtnPrev>
               <NavBtnNext className="slider-btn-next !absolute top-[95px] right-4"></NavBtnNext>
            </Swiper>
         </div>
         <BannerInfo className="mt-3">
            <h3 className="title-3">Кешбэк до 25% при покупке квартиры</h3>
            <Button>Узнать больше</Button>
         </BannerInfo>
      </>
   );
};

export default Cashback;
