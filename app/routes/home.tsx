import type { Route } from "./+types/home";
import HomePage from "~/pages/HomePage";
import MainLayout from "~/layouts/MainLayout";
import { getProducts } from "~/services/product.service";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function loader() {
  return getProducts(1, 4);
}

export default function Home() {
  return (
    <MainLayout>
      <HomePage />
    </MainLayout>
  );
}
