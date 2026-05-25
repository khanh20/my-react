import { Provider } from "react-redux";
import MainLayout from "~/layouts/MainLayout";
import CreateProduct from "~/pages/CreateProduct";
import store from "~/redux/store";

export function meta() {
  return [
    { title: "Create Product" },
    { name: "description", content: "Create a new product" },
  ];
}

export default function CreateProductRoute() {
  return (
    <Provider store={store}>
      <MainLayout>
        <CreateProduct />
      </MainLayout>
    </Provider>
  );
}
