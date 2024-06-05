"use client";
import { API } from "@/api/url";
import { Avatar, List, Radio, Rate } from "antd";
import React from "react";

const ProductReview = ({ productDetail }) => {
  console.log(productDetail.reviews);
  return (
    <div className="flex flex-col xs:flex-row pt-2">
      <div className="text-center xs:w-52">
        <p className="text-xl font-bold">Đánh giá</p>
        <p className="text-lg">{productDetail.product_ratingAverage}</p>
        <Rate
          disabled
          allowHalf
          defaultValue={productDetail.product_ratingAverage}
        />
      </div>
      <div className="w-full">
        <List
          pagination
          dataSource={productDetail.reviews}
          renderItem={(item, index) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar src={`${API}/${item.user.information.avatar}`} />
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
        />
      </div>
    </div>
  );
};

export default ProductReview;
