import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from './store';

export type SortingState = {
  sort: 'asc' | 'desc';
};

const initialSortingState: SortingState = {
  sort: 'desc',
};

const sortingSlice = createSlice({
  name: 'sort',
  initialState: initialSortingState,
  reducers: {
    setSortingType: (state: SortingState, action: PayloadAction<Pick<SortingState, 'sort'>>) => {
      state.sort = action.payload.sort;
    },
  },
});

const { setSortingType } = sortingSlice.actions;
const sortingReducer = sortingSlice.reducer;
const selectSortingType = ({ sort }: RootState) => sort.sort;

export { sortingReducer, selectSortingType, setSortingType };
