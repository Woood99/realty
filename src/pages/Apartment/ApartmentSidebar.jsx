import React, { useContext, useState } from 'react';

import { ApartmentContext } from '.';
import Sidebar from '../../components/Sidebar';
import RecordViewing from '../../ModalsMain/RecordViewing';
import Button from '../../uiForm/Button';
import UserInfo from '../../ui/UserInfo';
import numberReplace from '../../helpers/numberReplace';
import { useSelector } from 'react-redux';
import { ElementOldPrice } from '../../ui/Elements';

import styles from './Apartment.module.scss';
import { TagCashback, TagDiscount } from '../../ui/Tag';
import BtnShow from '../../ui/BtnShow';
import { Chars } from '../../ui/CharsFlat';

const ApartmentSidebar = () => {
   const { developer, price, priceOld, area, cashback = 0, masterSub, discount } = useContext(ApartmentContext);

   const [isOpenRecordView, setIsOpenRecordView] = useState(false);
   const [infoShowOpen, setInfoShowOpen] = useState(true);

   const selector = useSelector(state => state.apartment);

   if (!selector.info) return;
   
   return (
      <Sidebar>
         <div className="flex flex-col white-block-small p-6">
            <div className="flex gap-3 mb-2">
               {priceOld && <ElementOldPrice className="self-start text-defaultMax text-primary400">{numberReplace(priceOld)} ₽</ElementOldPrice>}
               {discount && <TagDiscount discount={discount.prc} />}
            </div>
            <div className={`flex items-end gap-4 ${styles.ApartmentSidebarBorderBottom}`}>
               {price && <h2 className="title-2">{numberReplace(price)} ₽</h2>}
               <span className="text-primary400 mb-0.5">{numberReplace(parseInt(price / area))} ₽/м²</span>
            </div>
            {(cashback || masterSub) && (
               <div className={styles.ApartmentSidebarBorderBottom}>
                  {cashback && (
                     <div className="flex justify-between items-center gap-2 mb-2">
                        <span>Кэшбэк за покупку</span>
                        <TagCashback cashback={cashback} prefix="" />
                     </div>
                  )}
                  {masterSub && (
                     <div className="flex justify-between items-center gap-2">
                        <span>С мастер подпиской</span>
                        <span className="font-medium text-small">+ {numberReplace(price / 100 * masterSub)} ₽</span>
                     </div>
                  )}
               </div>
            )}

            {selector.selectedPresents.length > 0 && (
               <div className={styles.ApartmentSidebarBorderBottom}>
                  <h3 className="title-3 mb-4">Подарки</h3>
                  <div className="flex flex-col gap-4 scrollbarPrimary overflow-y-auto max-h-[125px] pr-4">
                     {selector.selectedPresents.map((item, index) => {
                        return (
                           <div className="flex gap-4 flex-nowrap" key={index}>
                              <span className="overflow-hidden w-full text-ellipsis whitespace-nowrap">{item.title}</span>
                              <div className="whitespace-nowrap">
                                 <ElementOldPrice>{numberReplace(item.oldPrice)} ₽</ElementOldPrice>
                              </div>
                              <span className="font-medium whitespace-nowrap">{item.newPrice} ₽</span>
                           </div>
                        );
                     })}
                  </div>
               </div>
            )}
            <div className={styles.ApartmentSidebarBorderBottom}>
               <BtnShow active={infoShowOpen} onClick={() => setInfoShowOpen(prev => !prev)} className="!text-black justify-between w-full">
                  Общая сумма выгоды: {numberReplace(cashback + (price / 100) * discount.prc + (selector.info.maxAmount - selector.info.leftPrice))} ₽
               </BtnShow>
               {infoShowOpen && (
                  <div className="mt-4 flex flex-col gap-2 w-full">
                     <Chars justifyBetween={true}>
                        <span>Кэшбэк за покупку</span>
                        <span>{numberReplace(cashback)} ₽</span>
                     </Chars>
                     <Chars justifyBetween={true} color="blue">
                        <span>Персональная скидка</span>
                        <span>{numberReplace((price / 100) * discount.prc)} ₽</span>
                     </Chars>
                     <Chars justifyBetween={true}>
                        <span>Ваши подарки</span>
                        <span>{numberReplace(selector.info.maxAmount - selector.info.leftPrice)} ₽</span>
                     </Chars>
                  </div>
               )}
            </div>
            <div className="flex flex-col gap-3 w-full">
               <Button variant="secondary">Заказать консультацию</Button>
               <Button onClick={() => setIsOpenRecordView(true)}>Записаться на просмотр</Button>
            </div>
            <UserInfo className="mt-8" avatar={developer.avatarUrl} name={developer.name} pos={developer.pos} />
         </div>
         <RecordViewing condition={isOpenRecordView} set={setIsOpenRecordView} />
      </Sidebar>
   );
};

export default ApartmentSidebar;
