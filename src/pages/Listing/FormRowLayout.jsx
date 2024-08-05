import React from 'react';

import FormRow from '../../uiForm/FormRow';
import ShowType from './Filters/ShowType';
import ResetBtn from '../../uiForm/ResetBtn';
import FilterButton from '../../uiForm/FilterButton';
import { useDispatch, useSelector } from 'react-redux';
import { changeFieldInput, resetFilters, roomsToggle } from '../../redux/slices/listingSlice';

import Rooms from '../../uiForm/FiltersComponent/Rooms';
import PriceFromTo from '../../uiForm/FiltersComponent/PriceFromTo';

const FormRowLayout = ({ filterCount, setIsOpenMoreFilter }) => {
   const dispatch = useDispatch();
   const listingType = useSelector(state => state.listing.type);
   const { rooms, price } = useSelector(state => state.listing.filtersMain);

   return (
      <FormRow className={`${listingType === 'list' ? 'container' : 'px-4'} grid-cols-[145px_max-content_385px_max-content_max-content]`}>
         <FilterButton count={filterCount} onClick={() => setIsOpenMoreFilter(prev => !prev)} />
         <Rooms dispatchChange={roomsToggle} roomsSelector={rooms} />
         <PriceFromTo dispatchChange={changeFieldInput} priceSelector={price} />
         <ShowType className="ml-4" />
         <ResetBtn className="ml-4" text="Очистить" onClick={() => dispatch(resetFilters())} />
      </FormRow>
   );
};

export default FormRowLayout;
