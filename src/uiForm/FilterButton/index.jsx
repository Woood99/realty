import React from 'react';

import styles from './FilterButton.module.scss';

import { IconFilter } from '../../ui/Icons';

const FilterButton = ({ label = 'Фильтры', onClick = () => {}, count = 0 }) => {
   return (
      <button className={styles.FilterButtonRoot} onClick={onClick}>
         <IconFilter width={20} height={17} className={styles.FilterButtonIcon} />
         <span>{label}</span>
         {count && count > 0 ? <span className={styles.FilterButtonCount}>{count}</span> : null}
      </button>
   );
};

export default FilterButton;
