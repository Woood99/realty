import React from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './BackButton.module.scss';

import { IconArrow } from '../Icons';

const BackButton = ({ children, onClick }) => {
   const navigate = useNavigate();

   const backHandler = () => {
      onClick ? onClick() : navigate(-1);
   };

   return (
      <button onClick={backHandler} className={styles.BackButtonRoot}>
         {children || (
            <>
               <IconArrow />
               Назад
            </>
         )}
      </button>
   );
};

export default BackButton;
