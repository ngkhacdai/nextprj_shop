"use client";
import { URL } from "@/api/url";
import { Rate, Table } from "antd";
import React from "react";
import { FaStar } from "react-icons/fa";

const ProductReview = ({ productDetail }) => {
  const columns = [
    {
      title: "Ảnh",
      render: (record) => (
        <img
          alt=""
          className="w-16 h-16"
          src={`${URL}/${record.user.information.avatar}`}
        />
      ),
    },
    {
      title: "Tên người đánh giá",
      render: (record) => <p>{record.user.information.fullName}</p>,
    },
    {
      title: "Số điện thoại",
      render: (record) => <p>0{record.user.information.phoneNumber}</p>,
    },
    {
      title: "Đánh giá",
      render: (record) => (
        <div className="flex items-center">
          <p className="mr-2">{record.rating}</p>
          <FaStar className="text-yellow-400" />
        </div>
      ),
    },
    {
      title: "Nội dung đánh giá",
      render: (record) => (
        <p className="line-clamp-2 max-w-64">{record.comment}</p>
      ),
    },
    {
      title: "Ngày đánh giá",
      render: (record) => (
        <p>{new Date(record.updatedAt).toLocaleDateString("en-GB")}</p>
      ),
    },
  ];

  return (
    <div>
      <p className="font-semibold text-lg pb-2">Đánh giá</p>
      <div className="flex flex-col justify-center items-center pt-2">
        <div className="w-full">
          {productDetail.reviews === "Chưa có đánh giá nào" ? (
            <p>Chưa có đánh giá nào</p>
          ) : (
            <Table
              scroll={{ x: 800 }}
              dataSource={productDetail.reviews}
              columns={columns}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductReview;
