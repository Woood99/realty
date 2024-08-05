import React, { useContext, useState } from 'react';

import { BuildingContext } from '../';

import styles from './BuildingInfo.module.scss';

import { TagCashback, TagPresent, TagTop } from '../../../ui/Tag';
import MetroItems from '../../../ui/MetroItems';

import numberReplace from '../../../helpers/numberReplace';
import { Chars } from '../../../ui/CharsFlat';
import BtnShow from '../../../ui/BtnShow';

const BuildingInfo = () => {
   const { id, title, cashback, present, top, address, metro, minPrice, minPricePerMeter, attributes } = useContext(BuildingContext);

   const [attrActive, setAttrActive] = useState(false);

   const CharsTitle = ({ data }) => {
      return data.tabName ? <h3 className="title-3 mb-5">{data.tabName}</h3> : '';
   };
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
         <h2 className="title-2">{title}</h2>
         <p className="mt-2 mb-2">{address}</p>
         <MetroItems data={metro} visibleItems={99} />
         <div className="flex items-center gap-3 mt-6">
            <h3 className="title-2">от {numberReplace(minPrice)} ₽</h3>
            <div className="text-primary500">{numberReplace(minPricePerMeter)} ₽/м²</div>
         </div>
         <div className="mt-5">
            {attrActive
               ? attributes.map((attribute, index) => (
                    <div key={index} className={styles.BuildingInfoChars}>
                       <CharsTitle data={attribute} />
                       <div className={styles.BuildingInfoCharsItems}>
                          {attribute.items.map((item, currentIndex) => (
                             <CharsItem data={item} key={currentIndex} />
                          ))}
                       </div>
                    </div>
                 ))
               : attributes.map((attribute, index) => {
                    if (index !== 0) return;
                    return (
                       <div key={index} className={styles.BuildingInfoChars}>
                          <CharsTitle data={attribute} />
                          <div className={styles.BuildingInfoCharsItems}>
                             {attribute.items.map((item, currentIndex) => {
                                if (currentIndex >= 4) return '';
                                return <CharsItem data={item} key={currentIndex} />;
                             })}
                          </div>
                       </div>
                    );
                 })}
         </div>
         <BtnShow className="mt-5" onClick={() => setAttrActive(prev => !prev)} active={attrActive}>
            {attrActive ? 'Скрыть' : 'Показать полностью'}
         </BtnShow>
      </div>
   );
};

export default BuildingInfo;
