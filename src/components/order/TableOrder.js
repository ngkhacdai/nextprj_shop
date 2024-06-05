"use client";
import { API } from "@/api/url";
import { Button, Modal, Table, notification } from "antd";
import React, { useState } from "react";
import OrderDetail from "./OrderDetail";
import { changeStatus } from "@/api/Order";
import { usePathname } from "next/navigation";

const TableOrder = ({ orderData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [detail, setDetail] = useState([]);
  const getPathName = usePathname();
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = () => {
    api["success"]({
      message: "Thông báo",
      description: "Thay đổi trạng thái thành công",
    });
  };
  const handleOk = async () => {
    let status = "";
    if (detail.order_status === "pending") {
      status = "confirmed";
    } else if (detail.order_status === "confirmed") {
      status = "shipped";
    }
    const form = {
      order_id: detail.oderId,
      status,
    };
    await changeStatus(form, getPathName);
    openNotificationWithIcon();
    setIsModalOpen(false);
  };
  const canceledOrder = async () => {
    const form = {
      order_id: detail.oderId,
      status: "cancelled",
    };
    await changeStatus(form, getPathName);
    openNotificationWithIcon();
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const columns = [
    {
      title: "Mã đơn hàng",
      key: "Mã đơn hàng",
      dataIndex: "oderId",
    },

    {
      title: "Tên sản phẩm",
      key: "Tên sản phẩm",
      dataIndex: "product_name",
    },
    {
      title: "Số lượng",
      key: "Số lượng",
      render: (record) => {
        return <p>{record.product_attributes.quantity}</p>;
      },
    },
    {
      title: "Giá sản phẩm",
      key: "Giá sản phẩm",
      render: (record) => {
        return (
          <p>
            {record.product_attributes.price.toLocaleString("en-US", {
              style: "currency",
              currency: "VND",
            })}
          </p>
        );
      },
    },
    {
      title: "Tổng tiền",
      key: "Tổng tiền",
      render: (record) => {
        return (
          <p>
            {(
              record.order_checkout.feeShip +
              record.order_checkout.totalCheckout
            ).toLocaleString("en-US", { style: "currency", currency: "VND" })}
          </p>
        );
      },
    },
    {
      title: "Người mua",
      key: "Người mua",
      dataIndex: "user_name",
    },
    {
      title: "Hành động",
      key: "Action",
      render: (text, record, index) => {
        return <Button onClick={() => showModal(record)}>Xem chi tiết</Button>;
      },
    },
  ];
  const showModal = (record) => {
    setDetail(record);
    setIsModalOpen(true);
  };
  return (
    <div className="py-1">
      {contextHolder}
      <Table columns={columns} dataSource={orderData} scroll={{ x: 1000 }} />
      <Modal
        cancelText={"Đóng"}
        okText={
          detail.order_status === "pending"
            ? "Xác nhận đơn hàng"
            : detail.order_status === "confirmed" && "Giao hàng"
        }
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={
          <div>
            <Button onClick={handleCancel} className="mr-2">
              Đóng
            </Button>
            <Button
              style={
                detail.order_status !== "pending" &&
                detail.order_status !== "confirmed"
                  ? { display: "none" }
                  : {}
              }
              onClick={canceledOrder}
              type="primary"
              className="mr-2"
              danger
            >
              Hủy đơn
            </Button>
            <Button
              style={
                detail.order_status !== "pending" &&
                detail.order_status !== "confirmed"
                  ? { display: "none" }
                  : {}
              }
              onClick={handleOk}
              type="primary"
            >
              {detail.order_status === "pending"
                ? "Xác nhận đơn hàng"
                : detail.order_status === "confirmed" && "Giao hàng"}
            </Button>
          </div>
        }
      >
        <OrderDetail detail={detail} />
      </Modal>
    </div>
  );
};

export default TableOrder;
