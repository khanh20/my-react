import { Card, Form, Input, InputNumber, message, Upload } from "antd";
import type { UploadFile } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import ButtonField from "~/components/Button";
import type { CreateProductForm } from "~/models/product.models";
import {
  fetchCreateProduct,
  fetchUploadImg,
} from "~/redux/reducer/productThunk";
import type { AppDispatch } from "~/redux/store";

const CreateProduct = () => {
  const [form] = Form.useForm<CreateProductForm>();
  const dispatch = useDispatch<AppDispatch>();
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploadedImgUrl, setUploadedImgUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleUpload = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      message.error("Please upload an image file");
      return;
    }

    setIsUploading(true);
    setFileList([
      {
        uid: file.name,
        name: file.name,
        status: "uploading",
        percent: 0,
      },
    ]);

    try {
      const urlImg = await dispatch(fetchUploadImg(file)).unwrap();
      setUploadedImgUrl(urlImg);
      setFileList([
        {
          uid: file.name,
          name: file.name,
          status: "done",
          url: urlImg,
          percent: 100,
        },
      ]);
    } catch {
      message.error("Upload image failed");
      setUploadedImgUrl("");
      setFileList([]);
    } finally {
      setIsUploading(false);
    }
  };

  const onFinish = async (values: CreateProductForm) => {
    setIsSubmitting(true);
    try {
      const createdProduct = await dispatch(
        fetchCreateProduct({ ...values, urlImg: uploadedImgUrl }),
      ).unwrap();
      console.log(createdProduct);
      message.success("Create succesfully");
      form.resetFields();
      setUploadedImgUrl("");
      setFileList([]);
    } catch {
      message.error("Create failed");
    } finally {
      setIsSubmitting(false);
    }
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
          <Card
            size="small"
            title="Upload Image"
            className="border border-gray-200 cursor-pointer"
          >
            <Upload
              className="w-full flex justify-center"
              showUploadList={true}
              listType="picture"
              fileList={fileList}
              beforeUpload={(file) => {
                void handleUpload(file);
                return false;
              }}
              onRemove={() => {
                setUploadedImgUrl("");
                setFileList([]);
              }}
            >
              {fileList.length === 0 && (
                <div className="text-center text-gray-500">
                  Click or drag image to this area to upload
                </div>
              )}
            </Upload>
          </Card>
          <div className="w-full flex justify-center mt-5">
            <ButtonField
              loading={isSubmitting || isUploading}
              textButton="Submit"
              type="submit"
            ></ButtonField>
          </div>
        </Form>
      </div>
    </main>
  );
};
export default CreateProduct;
