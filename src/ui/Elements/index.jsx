import React from 'react';

import styles from './Elements.module.scss';

export const ElementOldPrice = props => {
   const { Selector = 'div', className = '' } = props;
   return (
      <Selector {...props} className={`${styles.ElementOldPrice} ${className}`}>
         {props.children}
      </Selector>
   );
};
