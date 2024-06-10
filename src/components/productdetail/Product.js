import { Col, Row } from "antd";
import dynamic from "next/dynamic";
import React from "react";
import ProductReview from "./ProductReview";
import Overview from "./Overview";
const ProductForm = dynamic(() => import("./ProductForm"), { ssr: false });
// import ProductImage from "./ProductImage";

const Product = ({ category, productDetail }) => {
  return (
    <div className="">
      <Overview productDetail={productDetail} />
      <ProductForm categoryData={category} productDetail={productDetail} />
      <ProductReview productDetail={productDetail} />
    </div>
  );
};

export default Product;
