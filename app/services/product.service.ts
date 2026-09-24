import axios from "axios";
import type { CreateProductForm, Product } from "~/models/product.models";
const PRODUCT_API_URL = import.meta.env.VITE_PRODUCT_API_URL;
const UPLOAD_IMG_URL = import.meta.env.VITE_UPLOAD_IMG;
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

const requireEnv = (value: string | undefined, name: string) => {
  if (!value) {
    throw new Error(`Missing env: ${name}`);
  }

  return value;
};

const normalizeSearchText = (value?: string | number) =>
  String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .trim();

export const getProducts = async (
  page: number,
  limit: number,
  keyword?: string,
) => {
  const apiUrl = requireEnv(PRODUCT_API_URL, "VITE_PRODUCT_API_URL");
  const trimmedKeyword = keyword?.trim();

  if (trimmedKeyword) {
    const response = await axios.get<Product[]>(apiUrl);
    const normalizedKeyword = normalizeSearchText(trimmedKeyword);
    const products = response.data.filter((product) => {
      const searchableText = normalizeSearchText(
        `${product.productName ?? ""} ${product.description ?? ""}`,
      );

      return searchableText.includes(normalizedKeyword);
    });
    const startIndex = (page - 1) * limit;

      return products.slice(startIndex, startIndex + limit);
  }

  const response = await axios.get<Product[]>(apiUrl, {
    params: {
      page,
      limit,
    },
  });
  return response.data;
};

export const getProductById = async (id: string) => {
  const response = await axios.get<Product>(`${PRODUCT_API_URL}/${id}`);
  return response.data;
};
export const createProduct = async (values: CreateProductForm) => {
  const response = await axios.post<Product>(
    requireEnv(PRODUCT_API_URL, "VITE_PRODUCT_API_URL"),
    values,
  );
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
export const upLoadImg = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append(
    "upload_preset",
    requireEnv(CLOUDINARY_UPLOAD_PRESET, "VITE_CLOUDINARY_UPLOAD_PRESET"),
  );
  const response = await axios.post(
    requireEnv(UPLOAD_IMG_URL, "VITE_UPLOAD_IMG"),
    formData,
  );
  return response.data.secure_url as string;
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
