import { Form, Input, InputNumber, message } from "antd";
import ButtonField from "~/components/Button";
import type { CreateProductForm } from "~/models/product.models";
import { createProduct } from "~/services/product.service";

const CreateProduct = () => {
  const [form] = Form.useForm<CreateProductForm>();
  const onFinish = async (values: CreateProductForm) => {
    try {
      await createProduct(values);
    } catch {
      message.error("Create failed");
      return;
    }
    message.success("Create succesfully");
    form.resetFields();
    console.log(values);
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
