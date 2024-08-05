import React from 'react';

import styles from './CardRow1.module.scss';

const CardRow1 = ({children,className = ''}) => {
   return <div className={`${styles.CardRowRoot} ${className}`}>{children}</div>;
};

export default CardRow1;
