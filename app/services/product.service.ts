import axios from "axios";
import type { CreateProductForm, Product } from "~/models/product.models";
const PRODUCT_API_URL = import.meta.env.VITE_PRODUCT_API_URL;

export const getProducts = async (page: number, limit: number) => {
  const response = await axios.get<Product[]>(
    `${PRODUCT_API_URL}?page=${page}&limit=${limit}`,
  );
  return response.data;
};

export const getProductById = async (id: string) => {
  const response = await axios.get<Product>(`${PRODUCT_API_URL}/${id}`);
  return response.data;
};
export const createProduct = async (values: CreateProductForm) => {
  const response = await axios.post<Product>(`${PRODUCT_API_URL}`, values);
  return response.data;
};
export const updateProduct = async (id: string, values: CreateProductForm) => {
  const response = await axios.put<Product>(`${PRODUCT_API_URL}/${id}`, values);
  return response.data;
};
export const deleteProduct = async (id: string) => {
  const response = await axios.delete<Product>(`${PRODUCT_API_URL}/${id}`);
  return response.data;
};
// const parseResponse = async <T>(response: Response, errorMessage: string) => {
//   if (!response.ok) {
//     throw new Error(errorMessage);
//   }

//   return response.json() as Promise<T>;
// };
// export const createProduct = async (values: CreateProductForm) => {
//   const response = await fetch(PRODUCT_API_URL, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(values),
//   });

//   return parseResponse<Product>(response, "Create failed");
// };

// export const updateProduct = async (id: string, values: CreateProductForm) => {
//   const response = await fetch(`${PRODUCT_API_URL}/${id}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(values),
//   });

//   return parseResponse<Product>(response, "Update failed");
// };

// export const deleteProduct = async (id: string) => {
//   const response = await fetch(`${PRODUCT_API_URL}/${id}`, {
//     method: "DELETE",
//   });

//   return parseResponse<Product>(response, "Delete failed");
// };
