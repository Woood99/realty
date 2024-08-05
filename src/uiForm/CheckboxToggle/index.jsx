import React from 'react';
import styles from './CheckboxToggle.module.scss';

const CheckboxToggle = ({ checked = false, set = () => {}, classNameInput = '' }) => {
   return (
      <label className={styles.CheckboxToggleRoot}>
         <input type="checkbox" value={checked} checked={checked} onChange={set} className={`${styles.CheckboxToggleInput} ${classNameInput}`} />
         <div aria-hidden="true" className={styles.CheckboxToggleEl} />
      </label>
   );
};

export default CheckboxToggle;
