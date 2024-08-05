import React from 'react';

import styles from './FormRow.module.scss';

const FormRow = ({ children, className = '', shadow = true }) => {
   return (
      <>
         {shadow ? (
            <div className={`${styles.FormRowContainer}`}>
               <div className={`${styles.FormRowRoot} ${className} mt-2 pb-3 scrollbarPrimary`}>{children}</div>
            </div>
         ) : (
            <div className={`${styles.FormRowRoot} ${className}`}>{children}</div>
         )}
      </>
   );
};

export default FormRow;
