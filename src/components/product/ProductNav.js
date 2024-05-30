"use client";
import { Menu } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";

const ProductNav = ({ children }) => {
  const items = [
    {
      label: <Link href="/product">Tất cả</Link>,
      key: "/product",
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
  // const items = [
  //   {
  //     label: <Link href="/product?status=all">Tất cả</Link>,
  //     key: "/product/",
  //   },
  //   {
  //     label: <Link href="/product?status=con_hang">Còn hàng</Link>,
  //     key: "/product/con_hang",
  //   },
  //   {
  //     label: <Link href="/product?status=het_hang">Hết hàng</Link>,
  //     key: "/product/het_hang",
  //   },
  //   {
  //     label: <Link href="/product?status=private">Bị ẩn</Link>,
  //     key: "/product/private",
  //   },
  // ];
  const pathName = usePathname();
  const shopInFor = useSelector((state) => state.shop.shopInFor);

  return (
    <div>
      {!shopInFor ||
        (shopInFor.length == 0 ? (
          <p>Hãy cập nhật thông tin shop trước</p>
        ) : (
          <div>
            <Menu
              mode="horizontal"
              defaultSelectedKeys={pathName}
              items={items}
            />
            {children}
          </div>
        ))}
    </div>
  );
};

export default ProductNav;
