import React, { useState, useRef, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';

import styles from './MultiSelect.module.scss';

import { IconArrowY } from '../../ui/Icons';

import Modal from '../../ui/Modal';

import LayoutBody from './LayoutBody';

const MultiSelect = ({ options, onChange, placeholderText = 'Не выбрано', search = false, btnsActions = false, value = [] }) => {
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

   const [selectedOptions, setSelectedOptions] = useState(value);

   const handlerToggle = () => {
      if (isOpen === false) {
         setSearchText('');
      }

      setIsOpen(!isOpen);
   };

   return (
      <div ref={dropdownRef} className={`${styles.MultiSelectRoot} ${isOpen ? styles.MultiSelectRootActive : ''}`}>
         <button onClick={handlerToggle} className={styles.MultiSelectButton}>
            <div className={`${styles.MultiSelectPlaceholder} ${selectedOptions.length === 0 ? styles.MultiSelectPlaceholderNone : ''}`}>
               {selectedOptions.length > 0
                  ? selectedOptions.map((item, index) => (
                       <div className={styles.MultiSelectPlaceholderItem} key={index}>
                          {item.label}
                       </div>
                    ))
                  : placeholderText}
            </div>
            <IconArrowY className={styles.MultiSelectCheck} />
         </button>
         {window.innerWidth > 1222 ? (
            <CSSTransition nodeRef={popupRef} in={isOpen} classNames="_open-select" timeout={200} unmountOnExit>
               <div ref={popupRef} className={styles.MultiSelectDropdown}>
                  <LayoutBody
                     options={options}
                     searchText={searchText}
                     setSearchText={setSearchText}
                     selectedOptions={selectedOptions}
                     onChange={onChange}
                     setSelectedOptions={setSelectedOptions}
                     handlerToggle={handlerToggle}
                     search={search}
                     btnsActions={btnsActions}
                  />
               </div>
            </CSSTransition>
         ) : (
            <Modal
               options={{ overlayClassNames: '_full _bottom', modalContentClassNames: styles.MultiSelectModal }}
               set={setIsOpen}
               condition={isOpen}
               closeBtn={false}>
               <LayoutBody
                  options={options}
                  searchText={searchText}
                  setSearchText={setSearchText}
                  selectedOptions={selectedOptions}
                  onChange={onChange}
                  setSelectedOptions={setSelectedOptions}
                  handlerToggle={handlerToggle}
                  search={search}
                  btnsActions={btnsActions}
               />
            </Modal>
         )}
      </div>
   );
};

export default MultiSelect;
