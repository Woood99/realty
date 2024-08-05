import React from 'react';

import styles from './BlockPersonalDiscount.module.scss';
import { Chars } from '../../ui/CharsFlat';
import numberReplace from '../../helpers/numberReplace';

import bookImage from '../../assets/img/book.png';
import Button from '../../uiForm/Button';

const dateConvert = (data, dateString = false) => {
   const parts = dateString ? data.split('.') : data;
   const date = dateString ? new Date(parts[2], parts[1] - 1, parts[0]) : data;

   const formattedDate = new Intl.DateTimeFormat('ru-RU', {
      day: 'numeric',
      month: 'long',
   }).format(date);

   return formattedDate;
};

const BlockPersonalDiscount = ({ data }) => {
   const dataDate = dateConvert(data.validUntil, true);
   const currentDate = dateConvert(new Date(), false);

   const discount = (data.price / 100) * data.prc;
   return (
      <div className="white-block">
         <div className={styles.BlockPersonalDiscountWrapper}>
            <div>
               <h2 className="title-2 mb-3">Ваша персональная скидка -{data.prc} %</h2>
               <p className="font-medium">Застройщик предлагает вам дополнительную скидку</p>
               <div className="flex flex-col gap-3 my-4">
                  <Chars justifyBetween>
                     <span>Обычная цена</span>
                     <span>{numberReplace(data.price)} ₽</span>
                  </Chars>
                  <Chars justifyBetween color="blue">
                     <span>Ваши -{data.prc}</span>
                     <span>-{numberReplace(discount)} ₽</span>
                  </Chars>
                  <Chars justifyBetween>
                     <span>Цена для вас</span>
                     <span>{numberReplace(data.price - discount)} ₽</span>
                  </Chars>
               </div>
               {dataDate === currentDate && <div className="text-red font-medium">Предложение действует последний день</div>}
               {dataDate !== currentDate && <div className="font-medium">Предложение действует до {dataDate}</div>}
            </div>
            <div>
               <img src={bookImage} width={120} height={120} alt="" />
            </div>
         </div>
         <Button variant="secondary" className="w-full mt-8">
            Забрать
         </Button>
      </div>
   );
};

export default BlockPersonalDiscount;
