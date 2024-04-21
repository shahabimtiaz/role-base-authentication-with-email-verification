// reducers/headerReducer.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface HeaderState {
  data: boolean;
}

const initialState: HeaderState = {
  data: false,
};

const headerSlice = createSlice({
  name: 'header',
  initialState,
  reducers: {
    updateHeaderData(state, action: PayloadAction<boolean>) {
      state.data = action.payload;
    },
  },
});

export const { updateHeaderData } = headerSlice.actions;
export default headerSlice.reducer;
