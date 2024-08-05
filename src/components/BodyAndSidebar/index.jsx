import React from 'react';

import styles from './BodyAndSidebar.module.scss';

const BodyAndSidebar = ({ children, className = '' }) => {
   return <div className={`${styles.BodyAndSidebarRoot} ${className}`}>{children}</div>;
};

export default BodyAndSidebar;
