import React from 'react';

import styles from './FieldRow.module.scss';

const FieldRow = ({ name = '', widthName = 100, widthChildren = 300, children, className = '' }) => {
   const widthStyles = {
      '--width-name': `${widthName}px`,
      '--width-children': `${widthChildren}px`,
   };
   return (
      <div className={`${styles.FieldRowRoot} ${className}`} style={widthStyles}>
         <span className={styles.FieldRowName}>{name}</span>
         <div className={styles.FieldRowChildren}>{children}</div>
      </div>
   );
};

export default FieldRow;
