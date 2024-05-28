"use client";
import { Menu } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const ProductNav = ({ children }) => {
  const pathName = usePathname();
  const items = [
    {
      label: <Link href="/product">Tất cả</Link>,
      key: "/product/",
    },
    {
      label: <Link href="/product/con_hang">Còn hàng</Link>,
      key: "/product/con_hang",
    },
    {
      label: <Link href="/product/het_hang">Hết hàng</Link>,
      key: "/product/het_hang",
    },
    {
      label: <Link href="/product/private">Bị ẩn</Link>,
      key: "/product/private",
    },
  ];
  return (
    <div>
      <Menu mode="horizontal" defaultSelectedKeys={pathName} items={items} />
      {children}
    </div>
  );
};

export default ProductNav;