import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  characters: [],
};

const charSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {
    selectCharacters: (state, { type, payload }) => {
      return { ...state, characters: payload };
    },
    charDetail: (state, { type, payload }) => {
      return { ...state, characters: payload };
    },
  },
});

export const { selectCharacters, charDetail } = charSlice.actions;
export default charSlice.reducer;
