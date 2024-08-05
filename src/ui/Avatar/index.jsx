import React from 'react';

import styles from './Avatar.module.scss';

const Avatar = props => {
   const { className = '', size = 40 } = props;
   return (
      <div style={{ width: `${size}px`, height: `${size}px` }} className={`${styles.Avatar} ${className}`}>
         {props.children}
      </div>
   );
};

export default Avatar;
