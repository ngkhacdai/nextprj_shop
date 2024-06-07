import { getALlProductByStatus } from "@/api/Product";
import TableProduct from "./TableProduct";
import { getAllCategory } from "@/api/Category";
import { getShopInfor } from "@/api/Shop";
import ModalAddProduct from "./ModalAddProduct";
import { Modal } from "antd";

const Product = async ({ productStatus }) => {
  const profile = await getShopInfor();
  let productData = [];
  let categoryData = [];
  if (profile) {
    productData = await getALlProductByStatus(productStatus);
    categoryData = await getAllCategory();
  }
  return (
    <div className="py-1">
      <TableProduct categoryData={categoryData} productData={productData} />
      <ModalAddProduct profile={profile} categoryData={categoryData} />
    </div>
  );
};

export default Product;
