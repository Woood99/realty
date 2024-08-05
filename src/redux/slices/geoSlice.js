import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   city: 'Краснодар',
};

const geoSlice = createSlice({
   name: 'geo',
   initialState,
   reducers: {},
});

export const {} = geoSlice.actions;

export default geoSlice.reducer;
