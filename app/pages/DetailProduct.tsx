import { useState } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router";
import type { CreateProductForm, Product } from "~/models/product.models";
import imgProduct from "../assets/img/pizza.png";
import ButtonField from "~/components/Button";
import LoadingLayout from "~/layouts/Loading";
import { Form, Input, InputNumber, message, Modal } from "antd";
import type { AppDispatch } from "~/redux/store";
import { useDispatch } from "react-redux";
import {
  fetchDeleteProduct,
  fetchUpdateProduct,
} from "~/redux/reducer/productThunk";

const DetailProduct = () => {
  const initialProduct = useLoaderData<Product>();
  const [product, setProduct] = useState<Product>(initialProduct);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
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
      });
    }
    setEditModal(true);
  };

  const handleEdit = async (values: CreateProductForm) => {
    if (!id) {
      return;
    }

    const updatedProduct = await dispatch(
      fetchUpdateProduct({ id, values }),
    ).unwrap();
    setProduct(updatedProduct);
    setEditModal(false);
    message.success("Update successfully");
  };

  return (
    <LoadingLayout loading={!product?.id}>
      <main className="  flex-1 flex flex-col justify-center">
        <div className="flex justify-center items-center gap-10">
          <img
            src={product?.urlImg || imgProduct}
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
          </Form>
        </Modal>
      </main>
    </LoadingLayout>
  );
};

export default DetailProduct;
