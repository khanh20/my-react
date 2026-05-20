import React, { Suspense } from "react";
import MainLayout from "~/layouts/MainLayout";
import { LoaderCircle } from "lucide-react";
import type { Route } from "./+types/detail-product";
import { getProductById } from "~/services/product.service";
// import DetailProduct from "~/pages/DetailProduct";
const DetailProduct = React.lazy(() => import("~/pages/DetailProduct"));

export function meta() {
  return [
    { title: "Detail Product" },
    { name: "description", content: "Detail product" },
  ];
}

export async function loader({ params }: Route.LoaderArgs) {
  if (!params.id) {
    throw new Response("Product not found", { status: 404 });
  }

  return getProductById(params.id);
}

export default function DetailProduceRoute() {
  return (
    <MainLayout>
      <Suspense
        fallback={
          <div className="flex flex-1 justify-center items-center w-full">
            <LoaderCircle className="w-20 h-20 font-bold animate-spin" />
          </div>
        }
      >
        <DetailProduct></DetailProduct>
      </Suspense>
    </MainLayout>
  );
}
