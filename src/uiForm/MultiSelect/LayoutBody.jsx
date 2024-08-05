import styles from './MultiSelect.module.scss';

import Input from '../Input';
import Button from '../Button';
import Checkbox from '../Checkbox';
import { IconClose } from '../../ui/Icons';

const LayoutBody = ({ options, searchText, setSearchText, setSelectedOptions, handlerToggle, search, btnsActions, selectedOptions, onChange }) => {
   const BtnsActionsLayout = () => {
      return (
         <div className={`${styles.MultiSelectActions} mb-6`}>
            <Button onClick={selectedOptionsAll} variant="secondary" size="26">
               Выбрать всё
            </Button>
            <Button onClick={selectedOptionsClear} variant="secondary" size="26">
               Очистить всё
            </Button>
         </div>
      );
   };

   const filteredOptions = options.filter(option => {
      return option.label.toLowerCase().includes(searchText.toLowerCase());
   });
   const searchHandler = value => {
      setSearchText(value);
   };

   const selectedOptionsAll = () => {
      setSelectedOptions([...options]);
      onChange([...options]);
      setSearchText('');
   };

   const selectedOptionsClear = () => {
      setSelectedOptions([]);
      onChange([]);
      setSearchText('');
   };

   const handleCheckboxChange = (event, option) => {
      const isChecked = event.target.checked;

      let newSelectedOptions;
      if (isChecked) {
         newSelectedOptions = [...selectedOptions, option];
      } else {
         newSelectedOptions = selectedOptions.filter(currentOption => currentOption.value !== option.value);
      }

      setSelectedOptions(newSelectedOptions);
      onChange(newSelectedOptions);
   };

   return (
      <div>
         <button onClick={handlerToggle} className={styles.MultiSelectClose}>
            <IconClose />
         </button>
         {search && <Input size="48" className="mb-4" placeholder="Поиск по названию" value={searchText} onChange={searchHandler} />}
         {btnsActions && <BtnsActionsLayout />}
         <div className={`${styles.MultiSelectList} scrollbarPrimary`}>
            {filteredOptions.length > 0 ? (
               filteredOptions.map((option, index) => (
                  <Checkbox
                     className={styles.MultiSelectItem}
                     key={index}
                     option={option}
                     checked={selectedOptions.find(currentOption => currentOption.value === option.value)}
                     onChange={event => handleCheckboxChange(event, option)}
                  />
               ))
            ) : (
               <span className={styles.MultiSelectSearchEmpty}>Поиск не дал результатов</span>
            )}
         </div>
      </div>
   );
};

export default LayoutBody;
