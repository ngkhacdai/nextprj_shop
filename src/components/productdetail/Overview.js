"use client";
import { Card, Col, Row } from "antd";
import React from "react";
import { FaStar } from "react-icons/fa";
import { MdRateReview, MdSell, MdStarRate } from "react-icons/md";

const Overview = ({ productDetail }) => {
  return (
    <div>
      <p className="font-semibold text-lg pb-2">Tổng quan</p>
      <Row gutter={[10, 10]}>
        <Col xs={24} sm={12} md={12} lg={8} xl={8} className="max-h-56 w-full">
          <Card className="h-full flex flex-col items-center justify-center text-center p-4 hover:drop-shadow-xl">
            <p className="flex justify-center">
              <MdSell className="text-xl" />
            </p>
            <h1 className="text-3xl font-bold">{productDetail.product_sold}</h1>
            <p className="text-slate-400 text-lg">Số lượng đã bán</p>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={12} lg={8} xl={8} className="max-h-56 w-full">
          <Card className="h-full flex flex-col items-center justify-center text-center p-4 hover:drop-shadow-xl">
            <p className="flex justify-center">
              <MdRateReview className="text-xl" />
            </p>
            <h1 className="text-3xl font-bold">
              {productDetail?.reviews === "Chưa có đánh giá nào"
                ? 0
                : productDetail?.reviews.length}
            </h1>
            <p className="text-slate-400 text-lg">Sô lượng người đánh giá</p>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={12} lg={8} xl={8} className="max-h-56 w-full">
          <Card className="h-full flex flex-col items-center justify-center text-center p-4 hover:drop-shadow-xl">
            <p className="flex justify-center">
              <MdStarRate className="text-xl" />
            </p>
            <h1 className="text-3xl font-bold flex items-center justify-center">
              {productDetail.product_ratingAverage}
              <FaStar className="text-yellow-400 ml-2 text-lg" />
            </h1>
            <p className="text-slate-400 text-lg">Đánh giá sản phẩm</p>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Overview;
