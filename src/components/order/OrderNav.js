"use client";
import { Menu } from "antd";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";

const OrderNav = ({ children }) => {
  const searchParam = useSearchParams();
  const items = [
    {
      key: "pending",
      label: <Link href={"/order?status=pending"}>Chờ duyệt</Link>,
    },
    {
      key: `confirmed`,
      label: <Link href={"/order?status=confirmed"}>Đã xác nhận</Link>,
    },
    {
      key: "shipped",
      label: <Link href={"/order?status=shipped"}>Đang giao</Link>,
    },
    {
      key: "delivered",
      label: <Link href={"/order?status=delivered"}>Đã giao</Link>,
    },
    {
      key: "cancelled",
      label: <Link href={"/order?status=cancelled"}>Bị hủy</Link>,
    },
  ];
  return (
    <div>
      <Menu
        defaultSelectedKeys={
          !searchParam.get("status") ? "pending" : searchParam.get("status")
        }
        items={items}
        mode="horizontal"
      />
      {children}
    </div>
  );
};

export default OrderNav;
