import React, { useEffect } from 'react';

import styles from './ApartmentPresents.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { addPresent, deletePresent, initPresents } from '../../../redux/slices/apartmentSlice';
import numberReplace from '../../../helpers/numberReplace';
import PresentCard from '../../../ui/PresentCard';

const ApartmentPresents = ({ data }) => {
   

   const dispatch = useDispatch();
   const selector = useSelector(state => state.apartment);

   if (data.type !== 'summ') return;

   useEffect(() => {
      dispatch(
         initPresents({
            maxAmount: data.maxAmount,
            leftPrice: data.maxAmount,
         })
      );
   }, []);
   if (!selector.info) return '';
   
   const onChangeHandler = (e, id) => {
      const target = e.target;

      if (target.checked) {
         const currentItem = data.items.find(item => item.id === id);
         dispatch(
            addPresent({
               id: currentItem.id,
               title: currentItem.title,
               oldPrice: currentItem.oldPrice,
               newPrice: currentItem.newPrice,
            })
         );
      } else {
         dispatch(deletePresent(id));
      }
   };

   return (
      <div className="white-block">
         <h2 className="title-2 mb-4">Подарки</h2>
         <p className="font-medium mb-5">Выберите подарки на сумму {numberReplace(selector.info.leftPrice)} ₽</p>
         <div className={styles.ApartmentPresentsCards}>
            {data.items.map((item, index) => {
               return (
                  <PresentCard
                     {...item}
                     key={index}
                     onChange={e => onChangeHandler(e, item.id)}
                     checked={selector.selectedPresents.find(present => present.id === item.id)}
                     className={styles.ApartmentPresentsCard}
                     value={selector.info.leftPrice < item.oldPrice - item.newPrice}
                  />
               );
            })}
         </div>
      </div>
   );
};

export default ApartmentPresents;
