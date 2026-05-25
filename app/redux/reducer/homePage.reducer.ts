import { createAction, createReducer } from "@reduxjs/toolkit";
import type { Product } from "~/models/product.models";
type HomePageState = {
  listProduct: Product[];
};
const initialState: HomePageState = {
  listProduct: [],
};

export const setProducts = createAction<Product[]>("homePage/setProducts");

const HomePageReducer = createReducer(initialState, (builder) => {
  builder.addCase(setProducts, (state, action) => {
    state.listProduct = action.payload;
  });
});
export default HomePageReducer;
