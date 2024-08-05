import React from 'react';

import styles from './CharsFlat.module.scss';

export const CharsFlat = props => {
   return <div className={styles.CharsFlat}>{props.children}</div>;
};

export const Chars = props => {
   const { justifyBetween = false, className = '', color = '' } = props;
   const classColor = () => {
      switch (color) {
         case '':
            return '';
         case 'blue':
            return styles.CharsBlue;
         default:
            return '';
      }
   };
   return <div className={`${styles.Chars} ${justifyBetween ? styles.CharsBetween : ''} ${className} ${classColor()}`}>{props.children}</div>;
};
