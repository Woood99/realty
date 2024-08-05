import React from 'react';

import { BtnAction } from '../ActionBtns';
import { IconComparison, IconFavoriteStroke } from '../Icons';

import styles from './CardSecond.module.scss';
import CardGallery from '../CardGallery';
import HistoryPrice from '../HistoryPrice';

import numberReplace from '../../helpers/numberReplace';
import UserInfo from '../UserInfo';
import Tooltip from '../Tooltip';
import Tag, { TagCashback, TagPresent, TagTop } from '../Tag';


const CardSecond = props => {
   const { images, name, address, history, user, rooms, area, floor, price, currentStatusPrice, frame, deadline, id } = props;
   const { cashback, present, top, tags, metro, className = '' } = props;

   const title = `${rooms === 0 ? 'Студия' : `${rooms}-комн квартира`}, ${area} м², ${floor} эт.`;

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
      <article className={`${styles.CardSecondRoot} ${className}`}>
         <a href="/asd" className={styles.CardSecondLink}></a>
         <CardGallery images={images} title={title} href="/asd" />
         <div className={styles.CardSecondContent}>
            <div className="flex gap-3 justify-between mb-8">
               <div className="flex flex-col">
                  <RenderTags />
                  <div className="flex items-center gap-2">
                     <h3 className='text-big font-medium'>{numberReplace(price)} ₽</h3>
                     <HistoryPrice currentStatus={currentStatusPrice} data={history} className="z-50 relative" />
                  </div>
                  <div className={styles.cardSecondMeter}>{numberReplace(Math.ceil(price / area))} ₽/м²</div>
                  <div className="title-4">{title}</div>
                  <p className={styles.CardSecondTerm}>
                     Корпус: {frame} Срок сдачи: {deadline}
                  </p>
                  <p className={styles.CardSecondName}>{name}</p>
                  <p className={styles.CardSecondAddress}>{address}</p>
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
            {user && (
               <div className={styles.CardSecondBottom}>
                  <UserInfo avatar={user.avatarUrl} name={user.name} pos={user.pos} />
               </div>
            )}
         </div>
      </article>
   );
};

export default CardSecond;
