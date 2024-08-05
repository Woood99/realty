import React from 'react';

import citiesData from '../../data/сitiesData';

import Modal from '../../ui/Modal';
import Button from '../../uiForm/Button';

import styles from './CityModal.module.scss';
import { useSelector } from 'react-redux';

const CityModal = ({ condition, set }) => {
   const currentCity = useSelector(state => state.geo.city);

   const onClickCity = item => {
   };

   return (
      <Modal options={{ overlayClassNames: '_left', modalClassNames: styles.CityModalRoot }} set={set} condition={condition}>
         <h2 className="title-2 modal-title-gap">Выбор города</h2>
         <div className={styles.CityModalItems}>
            {citiesData.map((item, index) => (
               <Button
                  onClick={() => onClickCity(item)}
                  active={item === currentCity}
                  className={`${styles.CityModalItem}`}
                  variant="secondary"
                  key={index}>
                  {item}
               </Button>
            ))}
         </div>
         <Button className={styles.CityModalSave}>Сохранить</Button>
      </Modal>
   );
};

export default CityModal;
