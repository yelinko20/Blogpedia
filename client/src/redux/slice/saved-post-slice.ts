import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { SavedPostProps } from "@/types/types";

type InitialState = {
  savedPosts: SavedPostProps[];
};

const initialState: InitialState = {
  savedPosts: [],
};

const savedPostSlice = createSlice({
  name: "savedPosts",
  initialState,
  reducers: {
    addSavedPosts: (state, action: PayloadAction<SavedPostProps>) => {
      state.savedPosts.push(action.payload);
    },
  },
});

export const { addSavedPosts } = savedPostSlice.actions;
export default savedPostSlice.reducer;
