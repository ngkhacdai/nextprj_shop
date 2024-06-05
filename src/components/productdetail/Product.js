import { Col, Row } from "antd";
import dynamic from "next/dynamic";
import React from "react";
import ProductReview from "./ProductReview";
const ProductForm = dynamic(() => import("./ProductForm"), { ssr: false });
// import ProductImage from "./ProductImage";

const Product = ({ category, productDetail }) => {
  return (
    <div className="">
      <ProductForm categoryData={category} productDetail={productDetail} />
      {/* <ProductImage productDetail={productDetail} /> */}
      <ProductReview productDetail={productDetail} />
    </div>
  );
};

export default Product;
