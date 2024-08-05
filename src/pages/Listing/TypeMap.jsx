import React from 'react';

import styles from './Listing.module.scss';
import CardPrimary from '../../ui/CardPrimary';
import ListingMap from './ListingMap';

import { CardPrimarySkeleton } from '../../ui/CardPrimary/Skeleton';
import { useSelector } from 'react-redux';
import EmptyBlock from '../../components/EmptyBlock';

const TypeMap = ({ options }) => {
   const lastTrigger = useSelector(state => state.listing.lastTrigger);

   return (
      <>
         <div className={`mmd1:px-4 ${styles.ListingMapContainer}`}>
            <div className={`${styles.ListingMapCards} scrollbarPrimary`} ref={options.listingMapCardsRef}>
               {options.isLoading &&
                  lastTrigger === 'filter' &&
                  [...new Array(3)].map((_, index) => {
                     return <CardPrimarySkeleton key={index} />;
                  })}
               {options.cards.length > 0 ? (
                  options.cards.map(item => {
                     return <CardPrimary variant="shadow" key={item.id} {...item} />;
                  })
               ) : (
                  <EmptyBlock />
               )}
            </div>
            {options.width > 1222 ? (
               <div className={styles.ListingMap}>
                  <ListingMap />
               </div>
            ) : (
               ''
            )}
         </div>
      </>
   );
};

export default TypeMap;
