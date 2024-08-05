import React from 'react';

import styles from './CardScheme.module.scss';
import numberReplace from '../../helpers/numberReplace';

const CardScheme = ({ data, room, onClick }) => {
   const { image, totalApartment, deadline, floors, frame, minArea, minPrice } = data;

   return (
      <article className={styles.CardSchemeRoot} onClick={onClick}>
         <div className={styles.CardSchemeImage}>
            <div className={`${styles.CardSchemeImageIbg} ibg-contain`}>
               <img src={image} alt="" />
            </div>
         </div>
         <div className={styles.CardSchemeContent}>
            <div className={styles.CardSchemeBtn}>Выбрать из {totalApartment} квартир</div>
            <h3 className="title-3 mt-4 mb-1">от {numberReplace(minPrice)} ₽</h3>
            <div>
               <span className="font-medium">{room === 0 ? 'Студия' : `${room}-комн.`}</span>
               <span className="font-medium"> {minArea} м² </span>
               <span>этажи: {floors.join(', ')}</span>
               <div className={styles.CardSchemeAttr}>
                  {frame && <span>Корпус: {frame}</span>}
                  {deadline && <span>Корпус: {deadline}</span>}
               </div>
            </div>
         </div>
      </article>
   );
};

export default CardScheme;
