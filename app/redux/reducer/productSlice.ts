import { createSlice } from "@reduxjs/toolkit";
import type { CreateProductForm, Product } from "~/models/product.models";
import {
  fetchCreateProduct,
  fetchGetProduct,
  fetchGetProductById,
} from "./productThunk";
type HomePageState = {
  listProduct: Product[];
  createProduct: CreateProductForm;
  productById: {};
  loading: boolean;
};
const initialState: HomePageState = {
  listProduct: [],
  loading: false,
  productById: {},
  createProduct: {
    productName: "",
    description: "",
    price: 0,
  },
};
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGetProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGetProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.listProduct = action.payload;
        console.log("action get product:", action);
      })
      .addCase(fetchGetProduct.rejected, (state) => {
        state.loading = false;
      })
      .addCase(fetchCreateProduct.fulfilled, (state, action) => {
        state.createProduct = {
          productName: action.payload.productName ?? "",
          description: action.payload.description ?? "",
          price: action.payload.price ?? 0,
        };
      })
      // get by ID
      .addCase(fetchGetProductById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGetProductById.fulfilled, (state, action) => {
        state.productById = action.payload;
        console.log("log productById", action);
      });
  },
});

export const {} = productSlice.actions;
export default productSlice.reducer;
