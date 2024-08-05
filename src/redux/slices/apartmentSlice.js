import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   selectedPresents: [],
};

const apartmentSlice = createSlice({
   name: 'apartment',
   initialState,
   reducers: {
      initPresents(state, action) {
         state.info = action.payload;
      },
      addPresent(state, action) {
         const currentPrice = state.info.maxAmount - recalculation([...state.selectedPresents, action.payload]);
         if (currentPrice >= 0) {
            state.selectedPresents.push(action.payload);
            state.info.leftPrice = currentPrice;
         }
      },
      deletePresent(state, action) {
         state.selectedPresents = [...state.selectedPresents].filter(item => item.id !== action.payload);
         state.info.leftPrice = state.info.maxAmount - recalculation(state.selectedPresents);
      },
   },
});

function recalculation(items) {
   return items.reduce((acc, item) => {
      return (acc += item.oldPrice - item.newPrice);
   }, 0);
}

export const { initPresents, addPresent, deletePresent } = apartmentSlice.actions;

export default apartmentSlice.reducer;
