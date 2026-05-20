import CardProduct from "~/components/CardProduct";
import { useState } from "react";
import { useLoaderData } from "react-router";
import type { Product } from "~/models/product.models";
import ButtonField from "~/components/Button";
import { getProducts } from "~/services/product.service";

const HomePage = () => {
  const initialProducts = useLoaderData<Product[]>();
  const [product, setProduct] = useState<Product[]>(initialProducts);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(2);
  const limit = 4;
  const handleShowMore = async () => {
    if (isLoading) {
      return;
    }

    setIsLoading(true);

    const data = await getProducts(page, limit);

    setProduct((prev) => [...prev, ...data]);
    setPage((prev) => prev + 1);
    setIsLoading(false);
  };

  // useMemo
  // 1. Luôn trả lại 1 value
  // 2. Cache lại  data
  // 3. Sẽ chạy lại nếu tham số dependence thay đổi
  // useRef
  return (
    <>
      <main className="  flex-1 flex gap-10 p-2.5 flex-wrap w-full ">
        {product.map((item) => (
          <CardProduct
            key={item.id}
            id={item.id}
            productName={item.productName}
            description={item.description}
            urlImg={item.urlImg}
            price={item.price}
          />
        ))}
        <div className="flex justify-center items-center w-full">
          <ButtonField
            loading={isLoading}
            onClick={handleShowMore}
            textButton="Show more"
          ></ButtonField>
        </div>
      </main>
    </>
  );
};
export default HomePage;
