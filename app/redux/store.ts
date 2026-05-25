import { configureStore } from "@reduxjs/toolkit";
import { ToyBrick } from "lucide-react";
import HomePageReducer from "./reducer/homePage.reducer";
const store = configureStore({
  reducer: { homePage: HomePageReducer 
  },
});
// Lấy rootState và  appdispatch  từ store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
