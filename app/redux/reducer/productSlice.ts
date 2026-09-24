import { createSlice } from "@reduxjs/toolkit";
import type { CreateProductForm, Product } from "~/models/product.models";
import {
  fetchCreateProduct,
  fetchGetProduct,
  fetchGetProductById,
  fetchUploadImg,
} from "./productThunk";
type HomePageState = {
  listProduct: Product[];
  createProduct: CreateProductForm;
  productById: {};
  loading: boolean;
  urlImg: string;
};
const initialState: HomePageState = {
  listProduct: [],
  loading: false,
  productById: {},
  urlImg: "",
  createProduct: {
    productName: "",
    description: "",
    price: 0,
    urlImg: "",
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
        if (action.meta.arg.page === 1) {
          state.listProduct = action.payload;
        } else {
          state.listProduct = [...state.listProduct, ...action.payload];
        }
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
          urlImg: action.payload.urlImg ?? "",
        };
      })
      //upLoadImg
      .addCase(fetchUploadImg.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUploadImg.fulfilled, (state, action) => {
        state.loading = false;
        state.urlImg = action.payload;
      })
      .addCase(fetchUploadImg.rejected, (state) => {
        state.loading = false;
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
