import React, { useState } from 'react';

import styles from './PresentCard.module.scss';
import Avatar from '../Avatar';
import CheckboxToggle from '../../uiForm/CheckboxToggle';
import { ElementOldPrice } from '../Elements';
import numberReplace from '../../helpers/numberReplace';

const PresentCard = props => {
   const { id, image, title, descr, specification, checked, onChange = () => {}, className = '', oldPrice, newPrice, value } = props;
   
   return (
      <div className={`${styles.PresentCardRoot} ${className} ${value && !checked ? '_disabled-opacity' : ''}`}>
         <Avatar size={44}>
            <img src={image} alt="" />
         </Avatar>
         <div className={styles.PresentCardInfo}>
            <p className="title-4">{title}</p>
            <p className={styles.PresentCardDescr}>{descr}</p>
            {specification && <button className={`blue-link ${styles.PresentCardSpec}`}>Посмотреть спецификацию</button>}
         </div>
         <div className={styles.PresentCardPrices}>
            <ElementOldPrice>{numberReplace(oldPrice)} ₽</ElementOldPrice>
            <span className="font-medium">{numberReplace(newPrice)} ₽</span>
         </div>
         <CheckboxToggle checked={checked} set={e => onChange(e, id)} classNameInput="inset-0 cursor-pointer" />
      </div>
   );
};

export default PresentCard;
