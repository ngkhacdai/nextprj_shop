"use client";
import { Card, Col, Row, Table, Tag, Tooltip } from "antd";
import React from "react";
import { FaMoneyBillWave } from "react-icons/fa";
import { SlUserFollow } from "react-icons/sl";
import { RiBillFill } from "react-icons/ri";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { API } from "@/api/url";

const OverView = ({ overViewData, analysisData }) => {
  if (!overViewData || !analysisData) {
    return "Hãy cập nhật thông tin cá nhân trước";
  }
  const columns = [
    {
      title: "Ảnh",
      render: (record) => {
        return (
          <img
            alt=""
            className="w-16 h-16"
            src={`${API}/uploads/${record.product_thumb[0]}`}
          />
        );
      },
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "product_name",
    },
    {
      title: "Giá",
      render: (record) => {
        return (
          <p>
            {record.product_price.toLocaleString("en-US", {
              style: "currency",
              currency: "VND",
            })}
          </p>
        );
      },
    },
    {
      title: "Tồn kho",
      dataIndex: "product_quantity",
    },
    {
      title: "Số lượng đã bán",
      dataIndex: "product_sold",
    },
    {
      title: "Trạng thái",
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
  ];
  console.log(overViewData);
  return (
    <div>
      <Row gutter={[10, 10]}>
        <Col xs={24} sm={12} md={12} lg={6} xl={6} className="max-h-56 w-full">
          <Card className="h-full flex flex-col items-center justify-center text-center p-4 hover:drop-shadow-xl">
            <p className="flex justify-center">
              <FaMoneyBillWave />
            </p>
            <h1 className="text-3xl font-bold">
              {(overViewData?.totalCheckout).toLocaleString("en-US", {
                style: "currency",
                currency: "VND",
              })}
            </h1>
            <p className="text-slate-400 text-lg">Doanh thu</p>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={12} lg={6} xl={6} className="max-h-56 w-full">
          <Card className="h-full flex flex-col items-center justify-center text-center p-4 hover:drop-shadow-xl">
            <p className="flex justify-center">
              <SlUserFollow />
            </p>
            <h1 className="text-3xl font-bold">{overViewData?.totalFollow}</h1>
            <p className="text-slate-400 text-lg">Theo dõi</p>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={12} lg={6} xl={6} className="max-h-56 w-full">
          <Card className="h-full flex flex-col items-center justify-center text-center p-4 hover:drop-shadow-xl">
            <p className="flex justify-center">
              <RiBillFill />
            </p>
            <h1 className="text-3xl font-bold">{overViewData?.totalOrders}</h1>
            <p className="text-slate-400 text-lg">Đơn hàng</p>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={12} lg={6} xl={6} className="max-h-56 w-full">
          <Card className="h-full flex flex-col items-center justify-center text-center p-4 hover:drop-shadow-xl">
            <p className="flex justify-center">
              <MdOutlineProductionQuantityLimits />
            </p>
            <h1 className="text-3xl font-bold">{overViewData?.totalProduct}</h1>
            <p className="text-slate-400 text-lg">Tổng sản phẩm</p>
          </Card>
        </Col>
      </Row>
      <ResponsiveContainer className="mt-2" width="100%" height={400}>
        <BarChart data={analysisData}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip wrapperStyle={{ width: 100, backgroundColor: "#ccc" }} />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <Bar dataKey="totalRevenue" fill="#8884d8" barSize={30} />
        </BarChart>
      </ResponsiveContainer>
      <Table dataSource={overViewData?.topSold} columns={columns} />
    </div>
  );
};

export default OverView;
