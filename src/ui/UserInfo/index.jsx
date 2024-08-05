import React from 'react';

import Avatar from '../Avatar';

import styles from './UserInfo.module.scss';

const UserInfo = ({ avatar = '', name, pos, children,className = '' }) => {
   return (
      <div className={`${styles.userInfo} ${className}`}>
         <Avatar className={styles.userInfoAvatar}>
            {avatar ? (
               <img loading="lazy" src={avatar} width="40" height="40" alt={name} />
            ) : (
               <div className={styles.userInfoAvatarBg}>{name[0]}</div>
            )}
         </Avatar>
         <div className="flex flex-col">
            <span className={styles.userInfoName}>{name}</span>
            <span className={styles.userInfoPos}>{pos}</span>
            {children}
         </div>
      </div>
   );
};

export default UserInfo;
