import React, { useState } from 'react';

import { IconPriceDown, IconPriceUp } from '../Icons';

import styles from './HistoryPrice.module.scss';
import numberReplace from '../../helpers/numberReplace';
import Tooltip from '../Tooltip';
import { BtnAction } from '../ActionBtns';

const HistoryPrice = ({ currentStatus, data, className = '' }) => {
   const CurrentIcon = ({ status }) => {
      if (status === 'up') {
         return <IconPriceUp width={15} height={15} />;
      }
      if (status === 'down') {
         return <IconPriceDown width={15} height={15} />;
      }
      return '';
   };

   const getCurrentClass = status => {
      if (status === 'up') {
         return styles.HistoryPriceStatusUp;
      }
      if (status === 'down') {
         return styles.HistoryPriceStatusDown;
      }
      return '';
   };

   const getCurrentOperator = status => {
      if (status === 'up') {
         return '+';
      }
      if (status === 'down') {
         return '-';
      }
      return '';
   };

   const HistoryWrapper = () => {
      return (
         <>
            <h3 className="title-3">История изменения цены</h3>
            <div className={styles.HistoryPriceContent}>
               {data.map((item, index) => {
                  return (
                     <div key={index} className={styles.HistoryPriceItem}>
                        <span className={styles.HistoryPriceDate}>{item.date}</span>
                        <span className={getCurrentClass(item.status)}>
                           {getCurrentOperator(item.status)}
                           {numberReplace(item.value)} ₽
                        </span>
                        <span className={styles.HistoryPriceMain}>{numberReplace(item.price)} ₽</span>
                     </div>
                  );
               })}
            </div>
         </>
      );
   };

   return (
      <Tooltip variant="element" Element={HistoryWrapper} event="click" position="bottom">
         <BtnAction className={`w-7 h-7 ${className}`}>
            <CurrentIcon status={currentStatus} />
         </BtnAction>
      </Tooltip>
   );
};

export default HistoryPrice;
