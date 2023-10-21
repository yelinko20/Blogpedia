import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  isOpen: boolean;
};

const initialState: InitialState = {
  isOpen: true,
};

const ModalSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    open: (state) => {
      state.isOpen = !state.isOpen;
    },
  },
});

export const { open } = ModalSlice.actions;
export default ModalSlice.reducer;
