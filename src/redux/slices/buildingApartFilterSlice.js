import { createSlice } from '@reduxjs/toolkit';
import cloneDeep from 'lodash.clonedeep';

import updateAdditionalFilters from '../helpers/updateAdditionalFilters';

import { apartmentsFilterRooms, apartmentsFilterPrice, apartmentsAdditionalFilters } from '../../data/building';

import roomsToggleFunc from '../helpers/roomsToggleFunc';
import changeFieldInputFunc from '../helpers/changeFieldInput';

export const buildingApartFilterDefaultValue = {
   filtersMain: {
      price: updateAdditionalFilters([apartmentsFilterPrice]).price,
      rooms: updateAdditionalFilters([apartmentsFilterRooms]).rooms,
   },
   filtersAdditional: updateAdditionalFilters(apartmentsAdditionalFilters),
};

const initialState = () => {
   const currentObject = cloneDeep(buildingApartFilterDefaultValue);
   return currentObject;
};

const buildingApartFilterSlice = createSlice({
   name: 'buildingApartFilter',
   initialState: initialState(),
   reducers: {
      roomsToggle(state, action) {
         roomsToggleFunc(state, action);
      },

      changeFieldInput(state, action) {
         changeFieldInputFunc(state, action);
      },

      changeFieldAdditional(state, action) {
         const currentFilter = state.filtersAdditional[action.payload.name];
         if (!currentFilter) return;
         currentFilter.value = action.payload.selectedOptions;
      },

      resetFilters(state) {
         state.filtersMain = cloneDeep(buildingApartFilterDefaultValue.filtersMain);
         state.filtersAdditional = cloneDeep(buildingApartFilterDefaultValue.filtersAdditional);
      },
   },
});

export const { roomsToggle, changeFieldInput, resetFilters, changeFieldAdditional } = buildingApartFilterSlice.actions;

export default buildingApartFilterSlice.reducer;
