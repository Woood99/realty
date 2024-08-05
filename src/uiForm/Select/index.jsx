import React, { useState, useRef, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';

import styles from './Select.module.scss';

import { IconArrowY } from '../../ui/Icons';

import Modal from '../../ui/Modal';
import LayoutBody from './LayoutBody';
import isEmptyArrObj from '../../helpers/isEmptyArrObj';

function Select({ options, value = {}, onChange, nameLabel, search = false,placeholderName = 'Не выбрано' }) {
   const [isOpen, setIsOpen] = useState(false);
   const [searchText, setSearchText] = useState('');

   const popupRef = useRef(null);
   const dropdownRef = useRef(null);

   useEffect(() => {
      const handleDocumentClick = event => {
         if (window.innerWidth <= 1222) return;
         if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
         }
      };

      document.addEventListener('click', handleDocumentClick, {
         capture: true,
      });

      return () => {
         document.removeEventListener('click', handleDocumentClick, {
            capture: true,
         });
      };
   }, []);

   function onChangeHandler(option) {
      setIsOpen(false);
      onChange(option);
   }

   const handlerToggle = () => {
      if (isOpen === false) {
         setSearchText('');
      }

      setIsOpen(!isOpen);
   };

   return (
      <div ref={dropdownRef} className={`${styles.SelectRoot} ${isOpen ? styles.SelectRootActive : ''}`}>
         <button onClick={handlerToggle} className={styles.SelectButton}>
            <div className={styles.SelectButtonWrapper}>
               <span className={`${styles.SelectPlaceholder} ${!isEmptyArrObj(value) ? styles.SelectPlaceholderActive : ''}`}>{nameLabel}</span>
               <span className={`${styles.SelectPlaceholderSelected} ${isEmptyArrObj(value) ? styles.SelectPlaceholderNone : ''}`}>
                  {!isEmptyArrObj(value) ? value.label : placeholderName}
               </span>
            </div>
            <IconArrowY className={styles.SelectCheck} />
         </button>
         <CSSTransition nodeRef={popupRef} in={isOpen} classNames="_open-select" timeout={200} unmountOnExit>
            <div ref={popupRef} className={styles.SelectDropdown}>
               <LayoutBody
                  options={options}
                  value={value}
                  onChange={onChangeHandler}
                  handlerToggle={handlerToggle}
                  searchText={searchText}
                  search={search}
                  setSearchText={setSearchText}
               />
            </div>
         </CSSTransition>
      </div>
   );
}

export default Select;
