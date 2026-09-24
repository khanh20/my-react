import { createAsyncThunk } from "@reduxjs/toolkit";
import type { CreateProductForm, Product } from "~/models/product.models";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
  upLoadImg,
} from "~/services/product.service";
type UpdateProductType = {
  id: string;
  values: CreateProductForm;
};
type GetProductType = {
  page: number;
  limit: number;
  keyword?: string;
};

export const fetchGetProduct = createAsyncThunk<Product[], GetProductType>(
  "product/setProducts",
  async ({ page, limit, keyword }, thunkAPI) => {
    const response = await getProducts(page, limit, keyword);
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
export const fetchUploadImg = createAsyncThunk<string, File>(
  "product/upLoadImg",
  async (file) => {
    const response = await upLoadImg(file);
    return response;
  },
);
