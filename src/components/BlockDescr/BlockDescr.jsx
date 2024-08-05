import React, { useState } from 'react';
import styles from './BlockDescr.module.scss';
import Tag from '../../ui/Tag';
import BtnShow from '../../ui/BtnShow';

const BlockDescr = ({ tags, descr, className = '' }) => {
   const [isActive, setIsActive] = useState(false);

   return (
      <div className={`white-block ${className}`}>
         <h2 className="title-2">Описание</h2>
         <div className="flex items-center gap-2 mt-4">
            {tags.map((tag, index) => {
               return (
                  <Tag key={index} size="small" color="default">
                     {tag}
                  </Tag>
               );
            })}
         </div>
         <div className={`${styles.BlockDescrWrapper} ${isActive ? styles.BlockDescrWrapperActive : ''}`}>
            {descr.map((item, index) => {
               return <p key={index}>{item}</p>;
            })}
         </div>
         <BtnShow className='mt-4' onClick={() => setIsActive(prev => !prev)} active={isActive}>
            {isActive ? 'Скрыть' : 'Показать полностью'}
         </BtnShow>
      </div>
   );
};

export default BlockDescr;
