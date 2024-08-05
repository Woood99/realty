import React from 'react';

import styles from './RoomInfoCard.module.scss';
import ThumbPhoto from '../../../ui/ThumbPhoto';
import { ElementOldPrice } from '../../../ui/Elements';
import numberReplace from '../../../helpers/numberReplace';
import Tag, { TagCashback, TagPresent, TagTop } from '../../../ui/Tag';
import Tooltip from '../../../ui/Tooltip';
import { BtnAction } from '../../../ui/ActionBtns';
import { IconComparison, IconFavoriteStroke } from '../../../ui/Icons';
import { Link } from 'react-router-dom';
import { RoutesPath } from '../../../constants/RoutesPath';

const RoomInfoCard = ({ data, room }) => {
   return (
      <div className={styles.RoomInfoCardRoot}>
         <Link to={`${RoutesPath.apartment}${data.id}`} className={styles.RoomInfoCardLink}></Link>
         <ThumbPhoto>
            <img src={data.image} width={85} height={85} alt="" />
         </ThumbPhoto>
         <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3">
               <ElementOldPrice>{numberReplace(data.oldPrice)} ₽</ElementOldPrice>
               <h3 className={`title-3 ${styles.RoomInfoCardTitle}`}>{numberReplace(data.price)} ₽</h3>
               <span className={styles.RoomInfoCardAttr}>
                  {room === 0 ? 'Студия' : `${room}-комн.`} {data.area} м², {data.floor} эт.
               </span>
            </div>
            <div className="flex items-center gap-3">
               <span>Корпус: {data.frame}</span>
               <span>Срок сдачи: {data.deadline}</span>
            </div>
         </div>
         <div className="flex items-center gap-4">
            <TagCashback cashback={data.cashback} />
            <TagPresent present={data.present} />
            <TagTop top={data.top} />
            {data.tags && data.tags.length > 0 ? (
               <div className="flex flex-wrap gap-1.5">
                  {data.tags.map((tag, index) => {
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
         </div>
         <div className="flex gap-4">
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
   );
};

export default RoomInfoCard;
