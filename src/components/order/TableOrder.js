"use client";
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
      key: "order_id",
      dataIndex: "oderId",
    },
    {
      title: "Tên sản phẩm",
      key: "product_name",
      dataIndex: "product_name",
    },
    {
      title: "Số lượng",
      key: "quantity",
      render: (record) => {
        return <span>{record.product_attributes.quantity}</span>;
      },
    },
    {
      title: "Giá sản phẩm",
      key: "price",
      render: (record) => {
        return (
          <span>
            {record.product_attributes.price.toLocaleString("en-US", {
              style: "currency",
              currency: "VND",
            })}
          </span>
        );
      },
    },
    {
      title: "Tổng tiền",
      key: "total",
      render: (record) => {
        return (
          <span>
            {(
              record.order_checkout.feeShip +
              record.order_checkout.totalCheckout
            ).toLocaleString("en-US", { style: "currency", currency: "VND" })}
          </span>
        );
      },
    },
    {
      title: "Người mua",
      key: "user_name",
      dataIndex: "user_name",
    },
    {
      title: "Hành động",
      key: "action",
      render: (text, record) => {
        return (
          <Button key={record.oderId} onClick={() => showModal(record)}>
            Xem chi tiết
          </Button>
        );
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
