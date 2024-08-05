import React from 'react';
import styles from './SliderPagination.module.scss';

const SliderPagination = ({ current, total }) => {
   return (
      <div className={styles.SliderPaginationRoot}>
         <div className={styles.SliderPaginationCounter}>
            <span>{current + 1}</span>
            <span>из</span>
            <span>{total}</span>
         </div>
         {total === 2 && (
            <div className={styles.SliderPaginationItems}>
               <span className={`${styles.SliderPaginationItem} ${current === 0 ? styles.SliderPaginationItemActive : ''}`}></span>
               <span className={`${styles.SliderPaginationItem} ${current === total - 1 ? styles.SliderPaginationItemActive : ''}`}></span>
            </div>
         )}
         {total > 2 && (
            <div className={styles.SliderPaginationItems}>
               <span className={`${styles.SliderPaginationItem} ${current === 0 ? styles.SliderPaginationItemActive : ''}`}></span>
               <span
                  className={`${styles.SliderPaginationItem} ${
                     current > 0 && current !== total - 1 ? styles.SliderPaginationItemActive : ''
                  }`}></span>
               <span className={`${styles.SliderPaginationItem} ${current === total - 1 ? styles.SliderPaginationItemActive : ''}`}></span>
            </div>
         )}
      </div>
   );
};

export default SliderPagination;
