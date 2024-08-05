import { createSlice } from '@reduxjs/toolkit';

const windowSizeSlice = createSlice({
   name: 'windowSize',
   initialState: {
      width: window.innerWidth,
      isDesktop: window.innerWidth > 1222,
   },
   reducers: {
      setWindowSize: (state, action) => {
         state.width = action.payload.width;
         state.isDesktop = action.payload.width > 1222;
      },
   },
});

export const { setWindowSize } = windowSizeSlice.actions;
export default windowSizeSlice.reducer;
