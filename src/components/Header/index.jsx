import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import styles from './Header.module.scss';

import HeaderActions from './HeaderActions';
import HeaderNav from './HeaderNav';
import { RoutesPath } from '../../constants/RoutesPath';

const headerNavData = [
   {
      name: 'Новостройки',
      items: [
         [
            {
               name: 'Жилые комплексы',
               subtitle: '36 990 предложений',
               link: RoutesPath.listing,
            },
            {
               name: 'Старт продаж',
               subtitle: '36 990 предложений',
               link: '#',
            },
            {
               name: 'Каталог застройщиков',
               subtitle: '15 застройщиков',
               link: '#',
            },
         ],
         [
            {
               name: 'Скидки и расчёты',
               link: '#',
            },
         ],
      ],
   },
   {
      name: 'Покупка',
   },
   {
      name: 'Реестр проблемных объектов',
   },
];

const Header = ({ children }) => {
   const location = useLocation();
   const listingType = useSelector(state => state.listing.type);

   const { width, isDesktop } = useSelector(state => state.windowSize);
   
   const [containerHeader, setContainerHeader] = useState(true);

   useEffect(() => {
      if (location.pathname === RoutesPath.listing && listingType === 'map') {
         setContainerHeader(false);
      } else {
         setContainerHeader(true);
      }
   }, [listingType, location]);

   return (
      <header className={styles.header}>
         <HeaderActions width={width} dataNav={headerNavData} containerHeader={containerHeader} />
         {isDesktop && <HeaderNav dataNav={headerNavData} containerHeader={containerHeader} />}
         {children}
      </header>
   );
};

export default Header;
