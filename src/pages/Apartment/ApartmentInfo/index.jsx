import React, { useContext, useState } from 'react';

import { ApartmentContext } from '../';

import styles from './ApartmentInfo.module.scss';

import Tag, { TagCashback, TagPresent, TagTop } from '../../../ui/Tag';
import MetroItems from '../../../ui/MetroItems';

import numberReplace from '../../../helpers/numberReplace';
import { Chars } from '../../../ui/CharsFlat';
import BtnShow from '../../../ui/BtnShow';

const ApartmentInfo = () => {
   const {
      id,
      title,
      cashback,
      present,
      top,
      tags = [],
      address,
      price,
      minPricePerMeter,
      attributes,
      complex,
      frame,
      deadline,
   } = useContext(ApartmentContext);

   const [attrActive, setAttrActive] = useState(false);

   const CharsItem = ({ data }) => {
      return (
         <Chars>
            <span>{data.name}</span>
            <span>{data.value}</span>
         </Chars>
      );
   };

   return (
      <div className="white-block">
         <div className="flex gap-4 flex-wrap mb-3">
            <TagCashback cashback={cashback} />
            <TagPresent present={present} />
            <TagTop top={top} />
         </div>
         {tags.length > 0 && (
            <div className="flex gap-4 flex-wrap mb-3">
               {tags.map((tag, index) => {
                  return (
                     <Tag key={index} size="small" color="default">
                        {tag}
                     </Tag>
                  );
               })}
            </div>
         )}
         <h2 className="title-2">{title}</h2>
         <h2 className="title-2 mt-2">{complex}</h2>
         <div className="flex items-center gap-3 mt-2 text-primary400">
            Корпус: {frame}
            Срок сдачи: {deadline}
         </div>
         <p className="mt-2 mb-2">{address}</p>
         <div className="mt-8">
            <div className={styles.ApartmentInfoChars}>
               {attrActive
                  ? attributes.map((attribute, index) => <CharsItem data={attribute} key={index} />)
                  : attributes.map((attribute, index) => {
                       return index < 4 ? <CharsItem data={attribute} key={index} /> : '';
                    })}
            </div>
         </div>
         <BtnShow className="mt-5" onClick={() => setAttrActive(prev => !prev)} active={attrActive}>
            {attrActive ? 'Скрыть' : 'Показать полностью'}
         </BtnShow>
      </div>
   );
};

export default ApartmentInfo;
