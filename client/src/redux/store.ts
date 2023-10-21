import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "@/redux/slice/modal-slice";
import queryReducer from "@/redux/slice/search-post-slice";
import savedPostReducer from "@/redux/slice/saved-post-slice";

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    query: queryReducer,
    savedPost: savedPostReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
