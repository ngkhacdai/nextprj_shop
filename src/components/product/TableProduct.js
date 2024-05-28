"use client";
import { Button, Col, Row, Table, Tag } from "antd";
import React from "react";
import ModalAddProduct from "./ModalAddProduct";
import { API } from "@/api/url";
import { useRouter } from "next/navigation";
import { publishById, unpublishById } from "@/api/Product";

const TableProduct = ({ productData, categoryData }) => {
  const router = useRouter();
  const columns = [
    {
      title: "Ảnh",
      key: "Ảnh",
      render: (text, record, index) => {
        return (
          <img
            alt=""
            className="w-28 h-28"
            src={`${API}/uploads/${record.product_thumb[0]}`}
          />
        );
      },
    },
    {
      title: "Tên sản phẩm",
      key: "Tên sản phẩm",
      dataIndex: "product_name",
    },
    {
      title: "Giá sản phẩm",
      key: "Giá sản phẩm",
      render: (text, record, index) => {
        return (
          <span>
            {record.product_price.toLocaleString("en-US", {
              style: "currency",
              currency: "VND",
            })}
          </span>
        );
      },
    },
    {
      title: "Số lượng đã bán",
      key: "Số lượng đã bán",
      dataIndex: "product_sold",
    },
    {
      title: "Tồn kho",
      key: "Tồn kho",
      dataIndex: "product_quantity",
    },
    {
      title: "Trạng thái",
      key: "Trạng thái",
      render: (text, record, index) => {
        return (
          <div>
            {record.isPublished ? (
              <Tag color="#87d068">Hiển thị</Tag>
            ) : (
              <Tag color="#f50">Bị ẩn</Tag>
            )}
          </div>
        );
      },
    },
    {
      title: "Hành động",
      key: "Hành động",
      render: (text, record, index) => {
        return (
          <Row justify={"space-between"} gutter={[0, 0]}>
            <Col span={10}>
              <Button type="primary" onClick={() => productDetail(record._id)}>
                Xem chi tiết
              </Button>
            </Col>
            <Col span={10}>
              <Button onClick={() => publishProduct(record)}>
                {record.isPublished ? <p>Ẩn</p> : <p>Hiển thị</p>}
              </Button>
            </Col>
          </Row>
        );
      },
    },
  ];
  const publishProduct = async (record) => {
    if (!record.isPublished) {
      await unpublishById(record._id);
    } else {
      await publishById(record._id);
    }
  };
  const productDetail = (id) => {
    router.push(`/productdetail?id=${id}`);
  };
  return (
    <div>
      <Table
        dataSource={
          productData.message == "Shop của bạn chưa có bất kỳ sản phẩm nào"
            ? null
            : productData
        }
        columns={columns}
        scroll={{ x: 1000 }}
      />
      <ModalAddProduct categoryData={categoryData} />
    </div>
  );
};

export default TableProduct;
