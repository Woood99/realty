import React, { useState, useRef, useEffect } from 'react';

import styles from './Tabs.module.scss';

const Tabs = ({ data, defaultValue = 0, children, bodyContent, navClassName = '', containerClassName = '', contentClassName = '' }) => {
   const [activeTab, setActiveTab] = useState(defaultValue);
   const navItems = useRef([]);

   const [position, setPosition] = useState({ left: 0, width: 0 });
   useEffect(() => {
      const activeElement = navItems.current[activeTab];
      if (activeElement) {
         setPosition({
            left: activeElement.offsetLeft,
            width: activeElement.offsetWidth,
         });
      }
   }, [activeTab]);

   const onClickButton = index => {
      setActiveTab(index);
   };

   return (
      <div className={containerClassName}>
         <nav className={`${styles.tabsNav} ${navClassName}`}>
            {data.map((item, index) => {
               return (
                  <button
                     key={index}
                     ref={el => (navItems.current[index] = el)}
                     className={`${styles.tabsBtn} ${activeTab === index ? styles.tabsBtnActive : ''}`}
                     onClick={e => onClickButton(index)}>
                     {item.name}
                  </button>
               );
            })}
            <div
               className={styles.magicLine}
               style={{
                  left: `${position.left}px`,
                  width: `${position.width}px`,
               }}
            />
         </nav>
         <div className={`mt-6 ${contentClassName}`}>
            {data.map((item, index) => {
               return activeTab === index && <div key={index}>{item.body}</div>;
            })}
            {bodyContent}
         </div>
         {children}
      </div>
   );
};

export default Tabs;
