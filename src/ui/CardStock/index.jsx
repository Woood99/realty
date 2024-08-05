import React from 'react';

import styles from './CardStock.module.scss';
import UserInfo from '../UserInfo';

const CardStock = props => {
   const { image, title, name, descr, user, href = '#' } = props;

   return (
      <article className={styles.CardStock}>
         <a href={href} className={styles.CardStockLink}></a>
         <div className={`${styles.CardStockImage} ibg`}>
            <img loading="lazy" src={image} width="323" height="207" alt={title} />
         </div>
         <div className={styles.CardStockContent}>
            {title && <h3 className={`title-4 ${styles.CardStockTitle}`}>{title}</h3>}
            {name && <div className={`${styles.CardStockName} title-4`}>{name}</div>}
            {descr && <p className={styles.CardStockDescr}>{descr}</p>}
            {user && (
               <div className={styles.CardStockUser}>
                  <UserInfo avatar={user.avatarUrl} name={user.name} pos={user.pos} />
               </div>
            )}
         </div>
      </article>
   );
};

export default CardStock;
