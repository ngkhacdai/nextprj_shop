"use client";
import { Button, Col, Dropdown, Row, Table, Tag } from "antd";
import React from "react";
import { URL } from "@/api/url";
import { useRouter } from "next/navigation";
import { publishById, unpublishById } from "@/api/Product";
import { FaStar } from "react-icons/fa";
import { BiShow, BiSolidDetail, BiSolidHide } from "react-icons/bi";

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
            src={`${URL}/uploads/${record.product_thumb[0]}`}
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
      title: "Đánh giá",
      key: "rate",
      dataIndex: "",
      render: (record) => {
        return (
          <div className="flex items-center">
            <p className="mr-2">{record.product_ratingAverage}</p>{" "}
            <FaStar className="text-yellow-400" />
          </div>
        );
      },
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
          <Row justify={"center"} gutter={[10, 0]}>
            <Col>
              <Dropdown
                menu={{
                  items: [
                    {
                      label: "Xem chi tiết",
                    },
                  ],
                }}
              >
                <Button
                  type="primary"
                  onClick={() => productDetail(record._id)}
                >
                  <BiSolidDetail />
                </Button>
              </Dropdown>
            </Col>
            <Col>
              <Dropdown
                menu={{
                  items: [
                    {
                      label: record.isPublished
                        ? "Ẩn sản phẩm"
                        : "Hiện sản phẩm",
                      key: 0,
                    },
                  ],
                }}
              >
                <Button onClick={() => publishProduct(record)}>
                  {record.isPublished ? (
                    <p>
                      <BiSolidHide />
                    </p>
                  ) : (
                    <p>
                      <BiShow />
                    </p>
                  )}
                </Button>
              </Dropdown>
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
    </div>
  );
};

export default TableProduct;
