import React from 'react';

import styles from './Sidebar.module.scss';

const Sidebar = ({ children }) => {
   return (
      <div>
         <div className={styles.SidebarRoot}>{children}</div>
      </div>
   );
};

export default Sidebar;
