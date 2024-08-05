import React from 'react';

import styles from './Tag.module.scss';
import numberReplace from '../../helpers/numberReplace';

import presentImg from '../../assets/img/present.png';

const Tag = ({ size = 'default', color = 'default', children, onClick = () => {}, value }) => {
   // size - small...
   // color - default, green, purple, dark-green
   let isActive = Boolean(value);
   const onClickHandler = () => {
      onClick(!isActive);
   };

   const currentSizeClass = () => {
      switch (size) {
         case 'small':
            return styles.TagSmall;
         case 'big':
            return styles.TagBig;
         default:
            return '';
      }
   };
   const currentColorClass = () => {
      switch (color) {
         case 'default':
            return '';
         case 'green':
            return styles.TagGreen;
         case 'yellow':
            return styles.TagYellow;
         case 'purple':
            return styles.TagPurple;
         case 'darkGreen':
            return styles.TagDarkGreen;
         case 'select':
            return styles.TagSelect;
         default:
            return '';
      }
   };
   return (
      <button onClick={onClickHandler} className={`${styles.Tag} ${currentSizeClass()} ${currentColorClass()} ${isActive ? styles.TagActive : ''}`}>
         {children}
      </button>
   );
};

export const TagCashback = ({ cashback = '', prefix = 'Кэшбэк от' }) => {
   return (
      cashback && (
         <Tag size="small" color="green">
            {prefix} {numberReplace(cashback)} ₽
         </Tag>
      )
   );
};

export const TagPresent = ({ present = '' }) => {
   return (
      present && (
         <Tag size="small" color="purple">
            Подарок
            <img src={presentImg} width={15} height={15} alt="Подарок" />
         </Tag>
      )
   );
};

export const TagTop = ({ top = '' }) => {
   return top ? (
      <Tag size="small" color="darkGreen">
         Топ {top}
      </Tag>
   ) : (
      ''
   );
};

export const TagDiscount = ({ discount = '' }) => {
   return discount ? (
      <Tag size="small" color="yellow">
         вам -{discount}
      </Tag>
   ) : (
      ''
   );
};

export default Tag;
