import React from 'react';

import boxSvg from '../../assets/svg/box.svg';

import styles from './EmptyBlock.module.scss';

const EmptyBlock = () => {
   return (
      <div className={`white-block ${styles.EmptyBlockRoot}`}>
         <img src={boxSvg} alt="" />
         <h3 className="title-3 mt-4">Поиск не дал результатов</h3>
         <p className="mt-3">Попробуйте изменить критерии поиска</p>
      </div>
   );
};

export default EmptyBlock;
