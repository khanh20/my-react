import { createAsyncThunk } from "@reduxjs/toolkit";
import type { CreateProductForm, Product } from "~/models/product.models";
import CreateProduct from "~/pages/CreateProduct";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "~/services/product.service";

export const fetchGetProduct = createAsyncThunk(
  "product/setProducts",
  async (_, thunkAPI) => {
    const response = await getProducts(1, 4);
    console.log("thunk gọi api", response);
    return response;
  },
);
export const fetchCreateProduct = createAsyncThunk<Product, CreateProductForm>(
  "product/createProduct",
  async (values, thunkAPI) => {
    const response = await createProduct(values);
    console.log("gọi api create", response);
    return response;
  },
);

export const fetchGetProductById = createAsyncThunk<Product, string>(
  "product/getProductById",
  async (id, thunkAPI) => {
    const response = await getProductById(id);
    return response;
  },
);
type UpdateProductType = {
  id: string;
  values: CreateProductForm;
};
export const fetchUpdateProduct = createAsyncThunk<Product, UpdateProductType>(
  "product/updateProduct",
  async ({ id, values }, thunkAPI) => {
    const response = await updateProduct(id, values);
    console.log("response update", response);
    return response;
  },
);
export const fetchDeleteProduct = createAsyncThunk<Product, string>(
  "product/deleteProduct",
  async (id, thunkAPI) => {
    const response = await deleteProduct(id);
    console.log("response delete", response);
    return response;
  },
);
