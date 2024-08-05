import React from 'react';
import FormRow from '../../../uiForm/FormRow';
import FilterButton from '../../../uiForm/FilterButton';
import Rooms from '../../../uiForm/FiltersComponent/Rooms';
import { useDispatch, useSelector } from 'react-redux';
import { changeFieldInput, resetFilters, roomsToggle } from '../../../redux/slices/buildingApartFilterSlice';
import PriceFromTo from '../../../uiForm/FiltersComponent/PriceFromTo';
import ResetBtn from '../../../uiForm/ResetBtn';

const FormRowLayout = ({ filterCount, setIsOpenMoreFilter }) => {
   const dispatch = useDispatch();
   const { rooms, price } = useSelector(state => state.buildingApartFilter.filtersMain);

   return (
      <FormRow shadow={false} className="grid-cols-[145px_max-content_385px_max-content_max-content]">
         <FilterButton count={filterCount} onClick={() => setIsOpenMoreFilter(prev => !prev)} />
         <Rooms dispatchChange={roomsToggle} roomsSelector={rooms} />
         <PriceFromTo dispatchChange={changeFieldInput} priceSelector={price} />
         <ResetBtn className="ml-4" text="Очистить" onClick={() => dispatch(resetFilters())} />
      </FormRow>
   );
};

export default FormRowLayout;
