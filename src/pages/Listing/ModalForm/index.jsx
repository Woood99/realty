import React from 'react';

import Modal from '../../../ui/Modal';
import ModalHeader from '../../../ui/Modal/ModalHeader';
import { useDispatch, useSelector } from 'react-redux';
import { changeFieldAdditional, changeFieldInput, resetFilters, roomsToggle } from '../../../redux/slices/listingSlice';
import Button from '../../../uiForm/Button';

import Rooms from '../../../uiForm/FiltersComponent/Rooms';
import PriceFromTo from '../../../uiForm/FiltersComponent/PriceFromTo';

import styles from './ModalForm.module.scss';
import FiltersFromData from '../../../unifComponents/FiltersFromData';

const ModalForm = ({ condition, set, filterCount, options }) => {
   const dispatch = useDispatch();

   const { rooms, price } = useSelector(state => state.listing.filtersMain);
   const filtersSelector = useSelector(state => state.listing.filtersAdditional);

   const optionsStyle = {
      '--modal-space': '40px',
      '--modal-height': 'calc(100vh - 80px)',
      '--modal-width': '1024px',
   };

   const optionsStyleMobile = {
      '--modal-space': '0',
      '--modal-height': '100vh',
      '--modal-width': '100%',
   };

   const ModalHeaderLayout = () => {
      return (
         <ModalHeader set={set} className="px-8 py-6 mb-8 md1:px-4 md1:py-4 md1:mb-6">
            <h2 className="title-2">Фильтры</h2>
         </ModalHeader>
      );
   };

   const ModalFooterLayout = () => {
      return (
         <div className="px-8 pt-6 pb-4 flex gap-4 justify-between items-center md1:pb-0 md1:px-4">
            {filterCount > 0 ? (
               <button className="red-link" onClick={() => dispatch(resetFilters())}>
                  Очистить ⋅ {filterCount}
               </button>
            ) : (
               <div />
            )}
            <Button size="Small" onClick={() => set(false)}>Показать {options.total} новостроек</Button>
         </div>
      );
   };

   const handleChange = (name, selectedOptions) => {
      dispatch(changeFieldAdditional({ name, selectedOptions }));
   };

   const handleChangeInput = (name, type, value) => {
      dispatch(
         changeFieldInput({
            name: type,
            value,
            path: `filtersAdditional.${name}`,
         })
      );
   };

   return (
      <Modal
         options={{ modalClassNames: `HeaderSticky !px-0 ${styles.ModalFormRoot}`, modalContentClassNames: '!py-0 !px-8 md1:!px-4' }}
         style={window.innerWidth > 1222 ? optionsStyle : optionsStyleMobile}
         set={set}
         condition={condition}
         closeBtn={false}
         ModalHeader={ModalHeaderLayout}
         ModalFooter={ModalFooterLayout}>
         <div className="flex flex-col gap-5">
            <div className="grid grid-cols-[max-content_385px] gap-2 mb-4 md1:grid-cols-1 md1:gap-5 md1:mb-0">
               <Rooms dispatchChange={roomsToggle} roomsSelector={rooms} />
               <PriceFromTo dispatchChange={changeFieldInput} priceSelector={price} />
            </div>
            {Object.keys(filtersSelector).map((key, index) => {
               const data = filtersSelector[key];
               return (
                  <FiltersFromData
                     data={data}
                     key={index}
                     handleChangeInput={handleChangeInput}
                     handleChange={handleChange}
                     filtersSelector={filtersSelector}
                  />
               );
            })}
         </div>
      </Modal>
   );
};

export default ModalForm;
