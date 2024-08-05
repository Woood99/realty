import React, { useState } from 'react';

import styles from './BuildingСonstruction.module.scss';

import Select from '../../../uiForm/Select';

import { constructProgressFilters } from '../../../data/building';

const BuildingСonstruction = () => {
   const [formValue, setFormValue] = useState([]);

   const onChange = (option, name) => {
      setFormValue({ ...formValue, [name]: option });
   };

   return (
      <div className="white-block">
         <h2 className="title-2">Ход строительства</h2>
         <form onSubmit={e => e.preventDefault()} className={styles.BuildingСonstructionForm}>
            {constructProgressFilters.map((filter, index) => {
               return (
                  <Select
                     key={index}
                     nameLabel={filter.nameLabel}
                     options={filter.options}
                     onChange={option => onChange(option, filter.name)}
                     value={formValue[filter.name]}
                  />
               );
            })}
         </form>
      </div>
   );
};

export default BuildingСonstruction;
