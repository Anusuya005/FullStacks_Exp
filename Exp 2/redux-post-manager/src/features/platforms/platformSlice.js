import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  platforms: ['Instagram', 'Facebook', 'Twitter', 'LinkedIn'],
};

const platformSlice = createSlice({
  name: 'platforms',
  initialState,
  reducers: {},
});

export default platformSlice.reducer;