import React, { useCallback, useEffect, useState } from 'react';
import debounce from 'lodash.debounce';

import { useDispatch, useSelector } from 'react-redux';
import ModalForm from './ModalForm';
import getCountOfSelectedFilter from '../../helpersComponent/getCountOfSelectedFilter';
import FormRowLayout from './FormRowLayout';
import isEmptyArrObj from '../../helpers/isEmptyArrObj';
import { fetchFilters, lastTrigger, setResultFilters } from '../../redux/slices/listingSlice';
import getCardsBuildings from '../../api/getCardsBuildings';

const ListingForm = ({ options }) => {
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(fetchFilters());
   }, []);

   const [isOpenMoreFilter, setIsOpenMoreFilter] = useState(false);

   const filtersSelector = useSelector(state => state.listing);
   const currentCity = useSelector(state => state.geo.city);

   const [filterCount, setFilterCount] = useState(0);

   const onSubmitHandler = e => {
      e.preventDefault();
   };
   useEffect(() => {
      const { filtersMain, filtersAdditional } = filtersSelector;
      setFilterCount(getCountOfSelectedFilter([filtersMain, filtersAdditional]));
      fetchData(filtersSelector);
   }, [filtersSelector.filtersMain, filtersSelector.filtersAdditional, filtersSelector.mapVisiblePlacemarks, filtersSelector.type]);

   const fetchData = useCallback(
      debounce(state => {
         let res = {
            visibleObjects: state.type === 'map' ? state.mapVisiblePlacemarks : [],
            filters: {},
         };
         const main = state.filtersMain;
         const additional = state.filtersAdditional;
         [main, additional].map(data => {
            for (const key in data) {
               const value = data[key].value;
               if (!isEmptyArrObj(value)) {
                  res.filters[data[key].name] = value;
               }
            }
         });
         dispatch(setResultFilters(res));
      }, 425),
      []
   );

   return (
      <form onSubmit={onSubmitHandler}>
         <FormRowLayout filterCount={filterCount} setIsOpenMoreFilter={setIsOpenMoreFilter} />
         <ModalForm condition={isOpenMoreFilter} set={setIsOpenMoreFilter} filterCount={filterCount} options={options} />
      </form>
   );
};

export default ListingForm;
