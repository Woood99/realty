import React from 'react';

import styles from './LogIn.module.scss';

import AVATAR from '../../../assets/img/avatar.png';
import Button from '../../../uiForm/Button';

const LogIn = () => {
   return (
      <div className={styles.logIn}>
         <div className={styles.rowTop}>
            <a href="#" className="title-2">
               Авторизируйтесь
            </a>
            <img loading="lazy" src={AVATAR} className={styles.avatar} width="70" height="70" alt="" />
         </div>
         <p className={styles.descr}>Чтобы посмотреть персональные предложения, подарки и кэшбэк от застройщиков</p>
         <Button variant="primary" className={styles.btn}>
            Войти
         </Button>
      </div>
   );
};

export default LogIn;
