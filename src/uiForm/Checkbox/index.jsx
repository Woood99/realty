import React from 'react';

import styles from './Checkbox.module.scss';
import { IconChecked } from '../../ui/Icons';

const Checkbox = ({ option, checked = false, onChange,className = '' }) => {
   return (
      <label className={`${styles.CheckboxRoot} ${className}`}>
         <input type="checkbox" value={option.value} checked={checked} onChange={onChange} className={styles.CheckboxInput} />
         <div className={styles.CheckboxMark}>
            <IconChecked />
         </div>
         <span className={styles.CheckboxContent}>{option.label}</span>
      </label>
   );
};

export default Checkbox;
