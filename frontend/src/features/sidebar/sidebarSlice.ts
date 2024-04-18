import { createSlice } from '@reduxjs/toolkit';

interface SidebarState {
  isOpen: boolean;
}

const initialState: SidebarState = {
  isOpen: false,
};

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    toggleSidebar(state) {
      state.isOpen = !state.isOpen;
    },
  },
  //   extraReducers: (builder) => {
  //     // future handling asynchronous or external state changes, migth needed
  //     builder.addDefaultCase((state, action) => {
  //       // default case for any unhandled actions
  //     });
  //   },
});

export const { toggleSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;
