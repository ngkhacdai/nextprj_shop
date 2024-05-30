"use client";
import { Card, Col, Row, Table, Tooltip } from "antd";
import React from "react";
import { FaMoneyBillWave } from "react-icons/fa";
import { SlUserFollow } from "react-icons/sl";
import { RiBillFill } from "react-icons/ri";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

const OverView = ({ overViewData, analysisData }) => {
  if (!overViewData || !analysisData) {
    return "Hãy cập nhật thông tin cá nhân trước";
  }
  return (
    <div>
      <Row gutter={[10, 10]}>
        <Col xs={24} sm={12} md={12} lg={6} xl={6} className="max-h-56 w-full">
          <Card className="h-full flex flex-col items-center justify-center text-center p-4 hover:drop-shadow-xl">
            <p className="flex justify-center">
              <FaMoneyBillWave />
            </p>
            <h1 className="text-3xl font-bold">
              {overViewData?.totalCheckout}
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
          {/* <Legend
            width={100}
            wrapperStyle={{
              top: 40,
              right: 20,
              backgroundColor: "#f5f5f5",
              border: "1px solid #d5d5d5",
              borderRadius: 3,
              lineHeight: "40px",
            }}
          /> */}
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <Bar dataKey="totalRevenue" fill="#8884d8" barSize={30} />
        </BarChart>
      </ResponsiveContainer>
      <Table dataSource={overViewData?.topSold} />
    </div>
  );
};

export default OverView;
