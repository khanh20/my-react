import { Form, Input, InputNumber, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import ButtonField from "~/components/Button";
import type { CreateProductForm } from "~/models/product.models";
import { fetchCreateProduct } from "~/redux/reducer/productThunk";
import type { AppDispatch, RootState } from "~/redux/store";

const CreateProduct = () => {
  const [form] = Form.useForm<CreateProductForm>();
  const dispatch = useDispatch<AppDispatch>();
  const createProductForm = useSelector(
    (state: RootState) => state.product.createProduct,
  );
  const onFinish = async (values: CreateProductForm) => {
    try {
      const createdProduct = await dispatch(fetchCreateProduct(values)).unwrap();
      console.log(createdProduct);
    } catch {
      message.error("Create failed");
      return;
    }
    message.success("Create succesfully");
    form.resetFields();
    console.log("values", values);
  };
  return (
    <main className=" flex-1 flex gap-10 p-2.5 flex-wrap w-full ">
      <div className="flex flex-col justify-center items-center text-left w-full">
        <div className="text-3xl font-bold mb-7">Create New Product</div>
        <Form
          form={form}
          layout="vertical"
          className="w-1/3"
          onFinish={onFinish}
        >
          <Form.Item
            label="Product Name"
            name="productName"
            rules={[{ required: true, message: "Please enter product name" }]}
          >
            <Input placeholder="Enter Product Name"></Input>
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please enter description" }]}
          >
            <Input.TextArea placeholder="Enter Description"></Input.TextArea>
          </Form.Item>
          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: "Please enter Price" }]}
          >
            <InputNumber placeholder="Enter Price"></InputNumber>
          </Form.Item>
          <div className="w-full flex justify-center">
            <ButtonField textButton="Submit" type="submit"></ButtonField>
          </div>
        </Form>
      </div>
    </main>
  );
};
export default CreateProduct;
