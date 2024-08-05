import styles from './Select.module.scss';

import Input from '../Input';
import { IconClose } from '../../ui/Icons';

const LayoutBody = ({ options, value, onChange, handlerToggle, searchText, setSearchText, search = false }) => {
   const filteredOptions = options.filter(option => {
      return option.label.toLowerCase().includes(searchText.toLowerCase());
   });
   const searchHandler = value => {
      setSearchText(value);
   };
   return (
      <div>
         <button onClick={handlerToggle} className={styles.SelectClose}>
            <IconClose />
         </button>
         {search && (
            <div className={styles.SelectSearch}>
               <Input size="48" placeholder="Поиск по названию" value={searchText} onChange={searchHandler} />
            </div>
         )}
         <div className={`${styles.SelectDropdownList} scrollbarPrimary`}>
            {filteredOptions.length > 0
               ? filteredOptions.map((option, index) => {
                    return (
                       <button
                          key={index}
                          onClick={() => onChange(option)}
                          className={`${styles.SelectDropdownItem} ${value.value === option.value ? styles.SelectDropdownItemActive : ''}`}>
                          {option.label}
                       </button>
                    );
                 })
               : <span className={styles.SelectSearchEmpty}>Поиск не дал результатов</span>}
         </div>
      </div>
   );
};

export default LayoutBody;
