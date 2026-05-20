import MainLayout from "~/layouts/MainLayout";
import CreateProduct from "~/pages/CreateProduct";

export function meta() {
  return [
    { title: "Create Product" },
    { name: "description", content: "Create a new product" },
  ];
}

export default function CreateProductRoute() {
  return (
    <MainLayout>
      <CreateProduct />
    </MainLayout>
  );
}
