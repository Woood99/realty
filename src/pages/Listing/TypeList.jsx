import React, { useState, useEffect } from 'react';

import styles from './Listing.module.scss';

import CardPrimary from '../../ui/CardPrimary';
import CardPrimaryRow from '../../ui/CardPrimary/CardPrimaryRow';

import { CardPrimarySkeleton, CardPrimaryRowSkeleton } from '../../ui/CardPrimary/Skeleton';
import { useSelector } from 'react-redux';
import EmptyBlock from '../../components/EmptyBlock';

const TypeList = ({ options }) => {
   const lastTrigger = useSelector(state => state.listing.lastTrigger);

   return (
      <>
         <div className="container flex flex-col gap-4">
            {options.isLoading &&
               lastTrigger === 'filter' &&
               [...new Array(3)].map((_, index) => {
                  return <CardPrimaryRowSkeleton key={index} />;
               })}
            {options.cards.length > 0 ? (
               options.cards.map(item => {
                  return <CardPrimaryRow variant="shadow" key={item.id} {...item} />;
               })
            ) : (
               <EmptyBlock />
            )}
         </div>
      </>
   );
};

export default TypeList;
