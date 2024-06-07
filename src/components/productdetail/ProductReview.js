"use client";
import { URL } from "@/api/url";
import {
  Avatar,
  Button,
  Dropdown,
  List,
  Modal,
  Radio,
  Rate,
  Table,
} from "antd";
import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { IoIosInformationCircle } from "react-icons/io";

const ProductReview = ({ productDetail }) => {
  console.log(productDetail);
  const columns = [
    {
      title: "Ảnh",
      render: (record) => {
        return (
          <img
            alt=""
            className="w-16 h-16"
            src={`${URL}/${record.user.information.avatar}`}
          />
        );
      },
    },
    {
      title: "Tên người đánh giá",
      render: (record) => {
        return <p>{record.user.information.fullName}</p>;
      },
    },
    {
      title: "Số điện thoại",
      render: (record) => {
        return <p>0{record.user.information.phoneNumber}</p>;
      },
    },
    {
      title: "Đánh giá",
      render: (record) => {
        return (
          <div className="flex items-center">
            <p className="mr-2">{record.rating}</p>
            <FaStar className="text-yellow-400" />
          </div>
        );
      },
    },
    {
      title: "Nội dung đánh giá",
      render: (record) => {
        return <p className="line-clamp-2 max-w-64">{record.comment}</p>;
      },
    },
    {
      title: "Ngày đánh giá",
      render: (record) => {
        return <p>{new Date(record.updatedAt).toLocaleDateString("en-GB")}</p>;
      },
    },
  ];
  return (
    <div className="flex flex-col justify-center items-center pt-2">
      <div className="text-center xs:w-52">
        <p className="text-xl font-bold">Đánh giá</p>
        <div>
          <p>
            Số lượt đánh giá:{" "}
            {productDetail.reviews === "Chưa có đánh giá nào"
              ? 0
              : productDetail.reviews.length}{" "}
          </p>
        </div>
        <Rate
          disabled
          allowHalf
          defaultValue={productDetail.product_ratingAverage}
        />
      </div>
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
  );
};

export default ProductReview;

{
  /* <List
            pagination
            dataSource={productDetail.reviews}
            renderItem={(item, index) => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Avatar src={`${URL}/${item.user.information.avatar}`} />
                  }
                  title={
                    <div className="flex items-center">
                      <p className="mr-2">{item.user.information.fullName}</p>
                      <Rate
                        allowHalf
                        disabled
                        className="text-lg"
                        defaultValue={item.rating}
                      />
                    </div>
                  }
                  description={
                    <div>
                      <p className="text-black">{item.comment}</p>
                      <p className="text-right">
                        {new Date(item.updatedAt).toLocaleDateString("en-GB")}
                      </p>
                    </div>
                  }
                />
              </List.Item>
            )}
          /> */
}
