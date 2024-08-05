import { useState } from 'react';

import styles from './Header.module.scss';

import CardLink from '../../ui/CardLink';
import Logo from './Logo';

const NavItem = data => {
   const [active, setActive] = useState(false);

   let time;

   const handleMouseEnter = e => {
      if (check()) return;

      const item = e.currentTarget;

      time = setTimeout(() => {
         setActive(true);
         item.classList.add('_active');
         document.body.classList.add('_active-mask');
      }, 400);
   };

   const handleMouseLeave = e => {
      if (check()) return;

      const item = e.currentTarget;

      clearTimeout(time);

      item.classList.remove('_active');
      document.body.classList.remove('_active-mask');

      setActive(false);
   };

   const check = () => {
      return window.innerWidth <= 1180 || !data.items;
   };

   const DropdownContent = () => {
      return (
         <div className={`${active ? styles.headerDropdownActive : ''} ${styles.headerDropdown} container`}>
            <div className={styles.headerDropdownContent}>
               {data.items.map((row, index) => {
                  return (
                     <div key={index} className={styles.headerDropdownRow}>
                        {row.map((dropdownItem, index) => {
                           return (
                              <CardLink key={index} href={dropdownItem.link}>
                                 <span>{dropdownItem.name}</span>
                                 {dropdownItem.subtitle && <span>{dropdownItem.subtitle}</span>}
                              </CardLink>
                           );
                        })}
                     </div>
                  );
               })}
            </div>
            <div className={styles.headerDropdownBanner}>banner...</div>
         </div>
      );
   };

   return (
      <li className={styles.headerNavItem} onMouseEnter={e => handleMouseEnter(e)} onMouseLeave={e => handleMouseLeave(e)}>
         <span className={styles.headerNavName}>{data.name}</span>
         {data.items && active ? <DropdownContent /> : ''}
      </li>
   );
};

const HeaderNav = ({ dataNav,containerHeader }) => {
   return (
      <div className={`${styles.headerNav}`}>
         <div className={`${styles.headerNavContainer} ${containerHeader ? 'container' : 'px-4'}`}>
            <Logo />

            <ul className={styles.headerNavList}>
               {dataNav.map((item, index) => {
                  return <NavItem key={index} {...item} />;
               })}
            </ul>
         </div>
      </div>
   );
};

export default HeaderNav;