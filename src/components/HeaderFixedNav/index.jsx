import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll';

import styles from './HeaderFixedNav.module.scss';
import getNavLinks from '../../helpersComponent/getNavLinks';

const HeaderFixedNav = () => {
   const [items, setItems] = useState([]);
   const [isVisible, setIsVisible] = useState(true);

   useLayoutEffect(() => {
      setItems(getNavLinks());
   }, []);

   useEffect(() => {
      const handleScroll = () => {
         const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
         setIsVisible(scrollTop > 100);
      };

      window.addEventListener('scroll', handleScroll);

      return () => {
         window.removeEventListener('scroll', handleScroll);
      };
   }, []);
   console.log(isVisible);
   
   return (
      <>
         {items.length > 0 && (
            <header className={`${styles.HeaderFixedNavRoot} ${isVisible ? styles.HeaderFixedNavRootActive : ''}`}>
               <ul className="container flex items-center gap-8 h-full">
                  {items.map(item => (
                     <li key={item.id}>
                        <Link
                           to={item.id}
                           activeClass={styles.HeaderFixedNavLinkActive}
                           className={styles.HeaderFixedNavLink}
                           spy={true}
                           smooth={true}
                           offset={-52 - 12}
                           duration={500}>
                           {item.label}
                        </Link>
                     </li>
                  ))}
               </ul>
            </header>
         )}
      </>
   );
};

export default HeaderFixedNav;
