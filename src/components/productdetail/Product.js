import { Col, Row } from "antd";
import dynamic from "next/dynamic";
import React from "react";
const ProductForm = dynamic(() => import("./ProductForm"), { ssr: false });
// import ProductImage from "./ProductImage";

const Product = ({ category, productDetail }) => {
  return (
    <div className="text-center">
      <ProductForm categoryData={category} productDetail={productDetail} />
      {/* <ProductImage productDetail={productDetail} /> */}
    </div>
  );
};

export default Product;
