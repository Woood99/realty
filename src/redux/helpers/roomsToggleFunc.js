function roomsToggleFunc(state, action) {
   if (action.payload.value) {
      state.filtersMain.rooms.value.push(action.payload.id);
   } else {
      state.filtersMain.rooms.value = state.filtersMain.rooms.value.filter(item => item !== action.payload.id);
   }
}

export default roomsToggleFunc;
