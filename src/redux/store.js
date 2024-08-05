import { configureStore } from '@reduxjs/toolkit';

import windowSizeSlice from './slicesHelp/windowSizeSlice';

import geoSlice from './slices/geoSlice';
import authSlice from './slices/authSlice';
import listingSlice from './slices/listingSlice';
import buildingApartFilterSlice from './slices/buildingApartFilterSlice';
import apartmentSlice from './slices/apartmentSlice';

export const store = configureStore({
   reducer: {
      windowSize: windowSizeSlice,
      geo: geoSlice,
      auth: authSlice,
      listing: listingSlice,
      buildingApartFilter: buildingApartFilterSlice,
      apartment: apartmentSlice,
   },
});
