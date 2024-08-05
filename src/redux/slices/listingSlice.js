import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import qs from 'qs';
import cloneDeep from 'lodash.clonedeep';

import updateAdditionalFilters from '../helpers/updateAdditionalFilters';

import { filterPrice, filterRooms } from '../../data/listingFilters';

import roomsToggleFunc from '../helpers/roomsToggleFunc';
import changeFieldInputFunc from '../helpers/changeFieldInput';
import { BASE_URL } from '../../constants/api';
import axios from 'axios';
import clearData from '../../helpers/clearData';

export const fetchFilters = createAsyncThunk('listing/fetchFilters', async () => {
   const requestURL = `${BASE_URL}/catalog/filters`;
   const { data } = await axios.get(requestURL);
   return data;
});

export const listingDefaultValue = {
   type: window.innerWidth > 1222 ? 'map' : 'list',
   page: 1,
   mapVisiblePlacemarks: [],
   resultFilters: {},
   startIsLoading: true,
   lastTrigger: 'filter',
   filtersMain: {
      price: updateAdditionalFilters([filterPrice]).price,
      rooms: updateAdditionalFilters([filterRooms]).rooms,
   },
   filtersAdditional: {},
};

const initialState = () => {
   const currentObject = cloneDeep(listingDefaultValue);
   if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      if (params.type) {
         currentObject.type = params.type;
      }
   }

   return currentObject;
};

const listingSlice = createSlice({
   name: 'listing',
   initialState: initialState(),
   reducers: {
      roomsToggle(state, action) {
         roomsToggleFunc(state, action);
      },
      changeType(state, action) {
         state.type = action.payload;
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
         state.filtersMain = cloneDeep(listingDefaultValue.filtersMain);
         Object.keys(state.filtersAdditional).forEach(key => {
            clearData(state.filtersAdditional[key].value);
         });
      },

      setVisiblePlacemarks(state, action) {
         state.mapVisiblePlacemarks = [...action.payload];
      },

      setResultFilters(state, action) {
         state.resultFilters = action.payload;
      },

      startIsLoading(state, action) {
         state.startIsLoading = false;
      },
      setCurrentPage(state, action) {
         state.page = action.payload;
      },
      lastTrigger(state, action) {
         state.lastTrigger = action.payload;
      },
   },
   extraReducers: builder => {
      builder
         .addCase(fetchFilters.pending, state => {
            state.filtersAdditional = {};
         })
         .addCase(fetchFilters.fulfilled, (state, action) => {
            const updateFilters = action.payload.map(filter => {
               if (filter.type === 'field-fromTo') {
                  return { ...filter, value: {} };
               }
               return filter;
            });
            state.filtersAdditional = updateAdditionalFilters(updateFilters);
         })
         .addCase(fetchFilters.rejected, state => {
            state.filtersAdditional = {};
         });
   },
});

export const {
   roomsToggle,
   changeType,
   changeFieldInput,
   resetFilters,
   changeFieldAdditional,
   setVisiblePlacemarks,
   setResultFilters,
   startIsLoading,
   setCurrentPage,
   lastTrigger,
} = listingSlice.actions;

export default listingSlice.reducer;
