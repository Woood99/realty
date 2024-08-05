import React, { useCallback, useState, useEffect } from 'react';
import FormRowLayout from './FormRowLayout';
import BuildingFilterModal from './BuildingFilterModal';
import { useSelector } from 'react-redux';
import debounce from 'lodash.debounce';
import isEmptyArrObj from '../../../helpers/isEmptyArrObj';
import getCountOfSelectedFilter from '../../../helpersComponent/getCountOfSelectedFilter';

const BuildingFilter = () => {
   const [isOpenMoreFilter, setIsOpenMoreFilter] = useState(false);
   const [filterCount, setFilterCount] = useState(0);

   const filtersSelector = useSelector(state => state.buildingApartFilter);

   const onSubmitHandler = e => {
      e.preventDefault();
   };

   useEffect(() => {
      const { filtersMain, filtersAdditional } = filtersSelector;
      setFilterCount(getCountOfSelectedFilter([filtersMain,filtersAdditional]));
      fetchData(filtersSelector);
   }, [filtersSelector]);

   const fetchData = useCallback(
      debounce(state => {
         let res = {
            filters: {},
         };

         const main = state.filtersMain;
         const additional = state.filtersAdditional;
         [main,additional].map(data => {
            for (const key in data) {
               const value = data[key].value;
               if (!isEmptyArrObj(value)) {
                  res.filters[data[key].name] = value;
               }
            }
         });
         // console.log(res);
      }, 350),
      []
   );

   return (
      <form onSubmit={onSubmitHandler} className='mt-6 mb-4'>
         <FormRowLayout filterCount={filterCount} setIsOpenMoreFilter={setIsOpenMoreFilter} />
         <BuildingFilterModal condition={isOpenMoreFilter} set={setIsOpenMoreFilter} filterCount={filterCount} />
      </form>
   );
};

export default BuildingFilter;
