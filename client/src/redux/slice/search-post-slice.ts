import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PostProps } from "@/types/types";

type InitialState = {
  query: string | null;
  searchPosts: PostProps[]; // Define the type for searchPosts
};

const initialState: InitialState = {
  query: "",
  searchPosts: [], // Initialize searchPosts as an empty array
};

const SearchPostSlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    setSearchPosts: (state, action: PayloadAction<PostProps[]>) => {
      state.searchPosts = action.payload;
    },
  },
});

export const { setQuery, setSearchPosts } = SearchPostSlice.actions;
export default SearchPostSlice.reducer;
