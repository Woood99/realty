import React, { useEffect, useState } from 'react';
import MaskedInput from 'react-text-mask';

import styles from './Input.module.scss';
import numberReplace from '../../helpers/numberReplace';

const Input = props => {
   const {
      className = '',
      before,
      after,
      placeholder,
      type = 'text',
      variant,
      size = 'default',
      onChange = () => {},
      value = '',
      maxLength = null,
      convertNumber = false,
      onlyNumber = false,
      mask = null,
   } = props;

   const [newValue, setNewValue] = useState(value);

   useEffect(() => {
      setNewValue(value);
   }, [value]);

   const labelClassNames = `${styles.InputRoot} ${className} ${variant ? styles[`Input${variant}`] : ''} 
   ${newValue.length > 0 ? styles.InputRootActive : ''}`;

   const onChangeHandler = e => {
      let result = e.target.value;

      if (onlyNumber) {
         result = result.replace(/\D/g, '');
      }
      if (convertNumber) {
         result = numberReplace(result);
      }

      setNewValue(result);
      onChange(result);
   };

   return (
      <label className={`${labelClassNames} ${size !== 'default' ? styles['InputSize' + size] : ''}`}>
         {before && <span className={styles.InputBefore}>{before}</span>}
         {!mask && (
            <input
               type={type}
               maxLength={maxLength}
               className={styles.InputWrapper}
               value={newValue}
               onChange={onChangeHandler}
               placeholder={placeholder}
            />
         )}
         {mask === 'phone' && <PhoneInput value={newValue} onChange={onChangeHandler} placeholder={placeholder} />}

         {after && <span className={styles.InputAfter}>{after}</span>}
      </label>
   );
};

export default Input;

const PhoneInput = ({ value, onChange, placeholder }) => {
   const phoneMask = ['+', '7', ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];

   return (
      <MaskedInput
         mask={phoneMask}
         className={styles.InputWrapper}
         value={value}
         onChange={onChange}
         placeholder={placeholder}
         guide={true}
         showMask={true}
      />
   );
};
