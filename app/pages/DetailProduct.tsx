import { useState } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router";
import type { CreateProductForm, Product } from "~/models/product.models";
import noImg from "../assets/img/noImg.png";
import ButtonField from "~/components/Button";
import LoadingLayout from "~/layouts/Loading";
import {
  Card,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Upload,
  type UploadFile,
} from "antd";
import type { AppDispatch } from "~/redux/store";
import { useDispatch } from "react-redux";
import {
  fetchDeleteProduct,
  fetchUpdateProduct,
  fetchUploadImg,
} from "~/redux/reducer/productThunk";

const DetailProduct = () => {
  const initialProduct = useLoaderData<Product>();
  const [product, setProduct] = useState<Product>(initialProduct);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploadedImgUrl, setUploadedImgUrl] = useState(product.urlImg ?? "");
  const [isUploading, setIsUploading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [form] = Form.useForm<CreateProductForm>();
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  const handleConfirm = async () => {
    if (id) {
      await dispatch(fetchDeleteProduct(id)).unwrap();
      navigate("/");
    }
    setDeleteModal(false);
  };

  const handleCancel = () => {
    setDeleteModal(false);
  };

  const handleOpenModal = () => {
    setDeleteModal(true);
  };

  const handleOpenEditModal = () => {
    if (product) {
      form.setFieldsValue({
        productName: product.productName,
        description: product.description,
        price: product.price,
        urlImg: product.urlImg,
      });
      setUploadedImgUrl(product.urlImg ?? "");
      setFileList(
        product.urlImg
          ? [
              {
                uid: String(product.id),
                name: product.productName || "Current image",
                status: "done",
                url: product.urlImg,
              },
            ]
          : [],
      );
    }
    setEditModal(true);
  };

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
        },
      ]);
      message.success("Upload image successfully");
    } catch {
      message.error("Upload image failed");
      setUploadedImgUrl(product.urlImg ?? "");
      setFileList(
        product.urlImg
          ? [
              {
                uid: String(product.id),
                name: product.productName || "Current image",
                status: "done",
                url: product.urlImg,
              },
            ]
          : [],
      );
    } finally {
      setIsUploading(false);
    }
  };

  const handleEdit = async (values: CreateProductForm) => {
    if (!id) {
      return;
    }

    setIsUpdating(true);

    try {
      const updatedProduct = await dispatch(
        fetchUpdateProduct({
          id,
          values: { ...values, urlImg: uploadedImgUrl },
        }),
      ).unwrap();
      setProduct(updatedProduct);
      setEditModal(false);
      setUploadedImgUrl(updatedProduct.urlImg ?? "");
      setFileList([]);
      message.success("Update successfully");
    } catch {
      message.error("Update failed");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <LoadingLayout loading={!product?.id}>
      <main className="  flex-1 flex flex-col justify-center">
        <div className="flex justify-center items-center gap-10">
          <img
            src={product?.urlImg || noImg}
            alt={product?.productName ?? ""}
            className="h-80 w-80"
          />
          <div className="">
            <h1 className="font-bold text-3xl">{product?.productName}</h1>
            <p className="text-2xl font-extrabold">
              {product?.price?.toLocaleString("vi-VN")}
            </p>
            <p>{product?.description}</p>
            <div className="flex gap-1.5 my-6">
              <ButtonField
                textButton="Remove"
                color="bg-red-400"
                onClick={handleOpenModal}
              ></ButtonField>
              <ButtonField
                textButton="Edit"
                color="bg-orange-400"
                onClick={handleOpenEditModal}
              ></ButtonField>
            </div>
          </div>
        </div>
        <Modal
          title="Ban co muon xoa san pham nay khong?"
          open={deleteModal}
          onOk={handleConfirm}
          onCancel={handleCancel}
        />
        <Modal
          title="Edit product"
          open={editModal}
          onOk={() => form.submit()}
          onCancel={() => setEditModal(false)}
          confirmLoading={isUpdating || isUploading}
        >
          <Form form={form} layout="vertical" onFinish={handleEdit}>
            <Form.Item
              label="Product Name"
              name="productName"
              rules={[{ required: true, message: "Please enter product name" }]}
            >
              <Input placeholder="Enter Product Name" />
            </Form.Item>
            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true, message: "Please enter description" }]}
            >
              <Input.TextArea placeholder="Enter Description" />
            </Form.Item>
            <Form.Item
              label="Price"
              name="price"
              rules={[{ required: true, message: "Please enter Price" }]}
            >
              <InputNumber className="w-full" placeholder="Enter Price" />
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
          </Form>
        </Modal>
      </main>
    </LoadingLayout>
  );
};

export default DetailProduct;
