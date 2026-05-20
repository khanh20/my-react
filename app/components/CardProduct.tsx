import type { Product } from "~/models/product.models";
import imgProduct from "../assets/img/pizza.png";
import { Link } from "react-router";
type Props = Product;
const CardProduct = ({
  id,
  productName,
  price,
  description,
  urlImg,
}: Props) => {
  return (
    <>
      <Link
        to={`/detail-product/${id}`}
        className="w-sm flex flex-col items-center"
      >
        <img
          src={urlImg || imgProduct}
          alt={productName ?? ""}
          className="h-56 w-56"
        />
        <div className="bg-black w-full flex flex-col items-center rounded-sm p-4">
          <div className="text-amber-50 font-bold text-xl">
            {productName} - {price?.toLocaleString("vi-VN")}
          </div>
          <div className="text-amber-50 font-se text-sm">{description}</div>
        </div>
      </Link>
    </>
  );
};
export default CardProduct;
