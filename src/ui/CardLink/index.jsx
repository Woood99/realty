import styles from './CardLink.module.scss';

import React from 'react';

const CardLink = ({ children, href }) => {
   if (href) {
      return (
         <a href={href} className={styles.root}>
            {children}
         </a>
      );
   } else {
      return <button className={styles.root}>{children}</button>;
   }
};

export default CardLink;
