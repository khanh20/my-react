import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./reducer/productSlice";

const store = configureStore({
  reducer: {
    product: productReducer,
  },
});
// Lấy rootState và  appdispatch  từ store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
