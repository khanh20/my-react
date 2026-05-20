import ButtonField from "../components/Button";
import { Link } from "react-router";
const Header = () => {
  return (
    <>
      <div className="border-b border-gray-300 flex justify-between px-10 py-4">
        <Link to="/" className="font-bold text-3xl">
          {" "}
          StoreByGK
        </Link>
        <Link to="/create-product">
          <ButtonField textButton="Create Product"></ButtonField>
        </Link>
      </div>
    </>
  );
};
export default Header;
