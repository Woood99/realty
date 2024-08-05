import React from 'react';
import ModalHeader from '../../../ui/Modal/ModalHeader';
import Button from '../../../uiForm/Button';
import Modal from '../../../ui/Modal';

import styles from './BuildingFilterModal.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { changeFieldAdditional, changeFieldInput, resetFilters, roomsToggle } from '../../../redux/slices/buildingApartFilterSlice';
import Rooms from '../../../uiForm/FiltersComponent/Rooms';
import PriceFromTo from '../../../uiForm/FiltersComponent/PriceFromTo';
import FieldRow from '../../../uiForm/FieldRow';
import MultiSelect from '../../../uiForm/MultiSelect';
import FieldInput from '../../../uiForm/FieldInput';
import Input from '../../../uiForm/Input';
import Select from '../../../uiForm/Select';

const BuildingFilterModal = ({ condition, set, filterCount }) => {
   const dispatch = useDispatch();

   const { rooms, price } = useSelector(state => state.buildingApartFilter.filtersMain);
   const filtersSelector = useSelector(state => state.buildingApartFilter.filtersAdditional);

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
            <Button size="Small">Показать 3 000 предложений</Button>
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
               if (data.type === 'list-multiple') {
                  return (
                     <FieldRow key={index} name={data.nameLabel} widthName={180} widthChildren={460}>
                        <MultiSelect
                           options={data.options}
                           value={data.value}
                           onChange={value => handleChange(data.name, value)}
                           search
                           btnsActions
                        />
                     </FieldRow>
                  );
               }
               if (data.type === 'list-single') {
                  return (
                     <FieldRow key={index} name={data.nameLabel} widthName={180} widthChildren={460}>
                        <Select
                           nameLabel={data.nameLabel}
                           placeholderName="Любой"
                           options={data.options}
                           onChange={value => handleChange(data.name, value)}
                           value={data.value}
                        />
                     </FieldRow>
                  );
               }

               if (data.type === 'field-fromTo') {
                  const { from, to } = data;
                  return (
                     <FieldRow key={index} name={data.nameLabel} widthName={180} widthChildren={460}>
                        <FieldInput>
                           <Input
                              value={filtersSelector[data.name].value[from.name]}
                              onChange={value => handleChangeInput(data.name, from.name, value)}
                              before={from.label}
                              variant="Left"
                              convertNumber
                              onlyNumber
                              maxLength={3}
                           />
                           <Input
                              value={filtersSelector[data.name].value[to.name]}
                              onChange={value => handleChangeInput(data.name, to.name, value)}
                              before={to.label}
                              after={data.postfix}
                              variant="Right"
                              convertNumber
                              onlyNumber
                              maxLength={3}
                           />
                        </FieldInput>
                     </FieldRow>
                  );
               }
            })}
         </div>
      </Modal>
   );
};

export default BuildingFilterModal;
