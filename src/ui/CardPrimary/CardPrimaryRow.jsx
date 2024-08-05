import React from 'react';

import styles from './CardPrimaryRow.module.scss';

import { IconComparison, IconFavoriteStroke } from '../Icons';
import { BtnAction } from '../ActionBtns';
import { CharsFlat } from '../CharsFlat';
import UserInfo from '../UserInfo';
import CardGallery from '../CardGallery';
import convertSum from '../../helpers/convertSum';
import Tag, { TagCashback, TagPresent, TagTop } from '../Tag';

import numberReplace from '../../helpers/numberReplace';
import Tooltip from '../Tooltip';

import MetroItems from '../MetroItems';
import findObjectWithMinValue from '../../helpers/findObjectWithMinValue';
import { Link } from 'react-router-dom';
import { RoutesPath } from '../../constants/RoutesPath';

const CardPrimaryRow = props => {
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
            return styles.CardPrimaryRowRootShadow;
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

   const pricesClassName = () => {
      const length = apartments.length;
      if (length === 0) return '';
      if (length <= 2) {
         return '!grid-rows-[1fr]';
      }
      if (length <= 4) {
         return '!grid-rows-[1fr_1fr]';
      }
      if (length > 4) {
         return '!grid-rows-[1fr_1fr_1fr]';
      }
   };

   return (
      <article className={`${styles.CardPrimaryRowRoot} ${className} ${classVariant()}`}>
         <div className={styles.CardPrimaryRowContainer}>
            <Link to={`${RoutesPath.building}${id}`} className={styles.CardPrimaryRowLink} />
            <CardGallery images={images} title={title} href={`${RoutesPath.building}${id}`} className={styles.CardPrimaryRowGallery} />
            <div className={styles.CardPrimaryRowWrapper}>
               <div className={styles.CardPrimaryRowContent}>
                  <div className="flex-grow">
                     <a href="#" className={`title-2 ${styles.CardPrimaryRowTitle}`}>
                        {title}
                     </a>
                     <p className={styles.CardPrimaryRowTerm}>Срок сдачи: {deadline}</p>
                     <p className={styles.CardPrimaryRowAddress}>{address}</p>
                     <div className={styles.CardPrimaryRowMetro}>
                        <MetroItems data={metro} />
                     </div>
                     <span className={styles.CardPrimaryRowQuantity}>{quantity} квартир от застройщика</span>
                     {apartments && apartments.length > 0 ? (
                        <div className={`${styles.CardPrimaryRowPrices} ${pricesClassName()}`}>
                           {apartments.map((item, index) => {
                              return (
                                 <CharsFlat key={index}>
                                    <span>{item.rooms === 0 ? 'Студии' : `${item.rooms}-комн`}</span>
                                    <span>от {convertSum(item.price)} ₽</span>
                                 </CharsFlat>
                              );
                           })}
                        </div>
                     ) : (
                        ''
                     )}
                  </div>
                  <div className={styles.CardPrimaryRowAdd}>
                     {apartments && apartments.length > 0 ? (
                        <h3 className="title-2 mb-2">от {numberReplace(findObjectWithMinValue(apartments, 'price').price)} ₽</h3>
                     ) : (
                        ''
                     )}

                     <RenderTags />
                  </div>
                  <div className="ml-auto flex flex-col gap-2">
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
               {user && (
                  <div className={styles.CardPrimaryRowBottom}>
                     <UserInfo avatar={user.avatarUrl} name={user.name} pos={user.pos} />
                  </div>
               )}
            </div>
         </div>
      </article>
   );
};

export default CardPrimaryRow;
