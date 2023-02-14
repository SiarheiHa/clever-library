import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from './store';

export type MenuState = {
  mode: 'open' | 'close';
};

const initialMenuState: MenuState = {
  mode: 'close',
};

const menuSlice = createSlice({
  name: 'menu',
  initialState: initialMenuState,
  reducers: {
    setMenuMode: (state: MenuState, action: PayloadAction<Pick<MenuState, 'mode'>>) => {
      state.mode = action.payload.mode;
    },
  },
});

const { setMenuMode } = menuSlice.actions;
const menuReducer = menuSlice.reducer;
const selectMenuMode = ({ menu }: RootState) => menu.mode;

export { menuReducer, selectMenuMode, setMenuMode };
