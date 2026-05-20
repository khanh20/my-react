import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";

type Props = {
  children?: React.ReactNode;
};

const MainLayout = ({ children }: Props) => {
  return (
    <>
      <div className="page-layout">
        <Header></Header>
        {children ?? <Outlet></Outlet>}
        <Footer></Footer>
      </div>
    </>
  );
};
export default MainLayout;
