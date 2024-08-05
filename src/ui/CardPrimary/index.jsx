import React, { useState } from 'react';

import styles from './CardPrimary.module.scss';

import { IconArrowSmall, IconComparison, IconFavoriteStroke } from '../Icons';
import { BtnAction } from '../ActionBtns';
import { CharsFlat } from '../CharsFlat';
import UserInfo from '../UserInfo';
import CardGallery from '../CardGallery';
import convertSum from '../../helpers/convertSum';
import Tag, { TagCashback, TagPresent, TagTop } from '../Tag';

import Tooltip from '../Tooltip';

import MetroItems from '../MetroItems';
import findObjectWithMinValue from '../../helpers/findObjectWithMinValue';
import { RoutesPath } from '../../constants/RoutesPath';
import { Link } from 'react-router-dom';

const CardPrimary = props => {
   const [activeChars, setActiveChars] = useState(false);

   const {
      title,
      deadline,
      images,
      address,
      quantity,
      apartments,
      user,
      cashback,
      present,
      top,
      tags,
      metro,
      className = '',
      variant = '',
      id,
   } = props;

   const classVariant = () => {
      switch (variant) {
         case '':
            return '';
         case 'shadow':
            return styles.CardPrimaryRootShadow;
         default:
            return '';
      }
   };

   const RenderTags = () => {
      return (
         <>
            <div className="flex flex-wrap gap-1.5 mb-1.5">
               <TagCashback cashback={cashback} />
               <TagPresent present={present} />
               <TagTop top={top} />
            </div>
            {tags && tags.length > 0 ? (
               <div className="mb-3 flex flex-wrap gap-1.5">
                  {tags.map((tag, index) => {
                     return (
                        <Tag key={index} size="small" color="default">
                           {tag}
                        </Tag>
                     );
                  })}
               </div>
            ) : (
               ''
            )}
         </>
      );
   };

   return (
      <article className={`${styles.CardPrimaryRoot} ${className} ${classVariant()}`}>
         <div>
            <Link to={`${RoutesPath.building}${id}`} className={styles.CardPrimaryLink} />
            <CardGallery images={images} title={title} href={`${RoutesPath.building}${id}`} />
            <div className={styles.CardPrimaryContent}>
               <div className="flex gap-3 justify-between">
                  <div>
                     <RenderTags />
                     <h3 className={`title-3-5 ${styles.CardPrimaryTitle}`}>{title}</h3>
                     <p className={styles.CardPrimaryTerm}>Срок сдачи: {deadline}</p>
                     <p className={styles.CardPrimaryAddress}>{address}</p>
                     <div className={styles.CardPrimaryMetro}>
                        <MetroItems data={metro} />
                     </div>
                  </div>
                  <div className="flex flex-col gap-2">
                     <Tooltip variant="text" text="Добавить в сравнение" event="move" gap={10} position="bottom">
                        <BtnAction className="relative z-50">
                           <IconComparison width={16} height={16} className="pointer-events-none" />
                        </BtnAction>
                     </Tooltip>
                     <Tooltip variant="text" text="Добавить в избранное" event="move" gap={10} position="bottom">
                        <BtnAction className="relative z-50">
                           <IconFavoriteStroke width={16} height={16} className="pointer-events-none" />
                        </BtnAction>
                     </Tooltip>
                  </div>
               </div>
               {apartments && apartments.length > 0 ? (
                  <>
                     <div className={styles.CardPrimaryQuantity}>
                        <button
                           className={`${styles.CardPrimaryQuantityBtn} ${activeChars ? '_active' : ''}`}
                           onClick={() => setActiveChars(prev => !prev)}>
                           {quantity} квартир от застройщика от {convertSum(findObjectWithMinValue(apartments, 'price').price)} ₽
                           <IconArrowSmall width={12} height={12} className="fill-blue" />
                        </button>
                        {activeChars && (
                           <div className="flex flex-col gap-2.5">
                              {apartments.map((item, index) => {
                                 return (
                                    <CharsFlat key={index}>
                                       <span>{item.rooms === 0 ? 'Студии' : `${item.rooms}-комн`}</span>
                                       <span>от {convertSum(item.price)} ₽</span>
                                    </CharsFlat>
                                 );
                              })}
                           </div>
                        )}
                     </div>
                  </>
               ) : (
                  ''
               )}
               {user && (
                  <div className={styles.CardPrimaryBottom}>
                     <UserInfo avatar={user.avatarUrl} name={user.name} pos={user.pos} />
                  </div>
               )}
            </div>
         </div>
      </article>
   );
};

export default CardPrimary;
