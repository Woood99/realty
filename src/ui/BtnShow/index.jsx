import React from 'react';

import styles from './BtnShow.module.scss';
import { IconArrowY } from '../Icons';

const BtnShow = ({ children, onClick, active = false, className = '' }) => {
   return (
      <button onClick={onClick} className={`${styles.BtnShowRoot} ${active ? styles.BtnShowRootActive : ''} ${className}`}>
         {children}
         <IconArrowY />
      </button>
   );
};

export default BtnShow;
