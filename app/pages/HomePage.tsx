import CardProduct from "~/components/CardProduct";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router";
import type { Product } from "~/models/product.models";
import ButtonField from "~/components/Button";
import { getProducts } from "~/services/product.service";
import { Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "~/redux/store";
import LoadingLayout from "~/layouts/Loading";
import { fetchGetProduct } from "~/redux/reducer/productThunk";

const { Search } = Input;

const HomePage = () => {
  const initialProducts = useLoaderData<Product[]>();
  const dispatch = useDispatch<AppDispatch>();
  const product = useSelector((state: RootState) => state.product.listProduct);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 4;

  useEffect(() => {
    dispatch(fetchGetProduct());
  }, [dispatch]);
  const handleShowMore = async () => {
    if (isLoading) {
      return;
    }

    setIsLoading(true);

    const data = await getProducts(page + 1, limit);

    dispatch(fetchGetProduct());

    setPage((prev) => prev + 1);
    setIsLoading(false);
  };

  // useMemo
  // 1. Luôn trả lại 1 value
  // 2. Cache lại  data
  // 3. Sẽ chạy lại nếu tham số dependence thay đổi
  // useRef
  const handleSearch = async (keyword: string) => {
    const data = await getProducts(page, limit, keyword);
    console.log(keyword);
    console.log(data);
    dispatch(fetchGetProduct());
  };
  return (
    <LoadingLayout loading={product.length === 0}>
      <main className="  flex-1 flex gap-10 p-2.5 flex-wrap w-full ">
        <div className="w-full flex justify-center h-fit">
          <Input.Search
            placeholder="Enter Search Here"
            allowClear
            style={{ width: "40%" }}
            onSearch={handleSearch}
          ></Input.Search>
        </div>
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
    </LoadingLayout>
  );
};

export default HomePage;
