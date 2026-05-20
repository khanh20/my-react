export type Product = {
  id: number;
  productName?: string;
  description?: string;
  urlImg?: string;
  price?: number;
};
export type CreateProductForm = {
  productName: string;
  description: string;
  price: number;
};
