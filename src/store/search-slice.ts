import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from './store';

export type SearchState = {
  searchString: string;
};

const initialSearchState: SearchState = {
  searchString: '',
};

const searchSlice = createSlice({
  name: 'search',
  initialState: initialSearchState,
  reducers: {
    setSearchString: (state: SearchState, action: PayloadAction<Pick<SearchState, 'searchString'>>) => {
      state.searchString = action.payload.searchString;
    },
  },
});

const { setSearchString } = searchSlice.actions;
const searchReducer = searchSlice.reducer;
const selectSearchString = ({ search }: RootState) => search.searchString;

export { searchReducer, selectSearchString, setSearchString };
