import React from 'react';

import styles from './NavBtns.module.scss';

import { IconArrow } from '../Icons';

export const NavBtnPrev = props => {
   const { className = '', variant = 'Primary', centery = false } = props;

   const currentVariant = `NavBtnRoot${variant}`;

   return (
      <button {...props} className={`${styles[currentVariant]} ${className} ${centery ? styles.btnCenterPrev : ''}`}>
         <IconArrow className={`${styles.prev}`} />
      </button>
   );
};
export const NavBtnNext = props => {
   const { className = '', variant = 'Primary', centery = false } = props;
   const currentVariant = `NavBtnRoot${variant}`;
   return (
      <button {...props} className={`${styles[currentVariant]} ${className} ${centery ? styles.btnCenterNext : ''}`}>
         <IconArrow />
      </button>
   );
};
