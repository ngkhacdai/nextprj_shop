"use client";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { SiStatista } from "react-icons/si";
import logo from "@/assets/trustybuy.png";
import { Button, Col, Layout, Menu, Row, theme } from "antd";
import { useEffect, useState } from "react";
import Link from "next/link";
import { IoIosLogOut, IoIosNotifications } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { fetchShopInfor } from "@/redux/slice/ShopSlice";
import { usePathname } from "next/navigation";
import { signout } from "@/api/Access";
const { Header, Sider, Content } = Layout;
const SidebarClient = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const shopInfor = useSelector((state) => state.shop.shopInFor);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchShopInfor());
  }, []);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const pathname = usePathname();
  const logoutHandler = async () => {
    await signout();
  };
  return (
    <Layout>
      <Sider
        className="h-screen sticky top-0"
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <div className="demo-logo-vertical">
          <img alt="" src={logo.src} className="w-full h-40" />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[pathname]}
          items={[
            {
              key: "/",
              icon: <SiStatista />,
              label: <Link href={"/"}>Thống kê</Link>,
            },
            {
              key: "/product",
              icon: <VideoCameraOutlined />,
              label: <Link href={"/product"}>Sản phẩm</Link>,
            },
            {
              key: "/order",
              icon: <UploadOutlined />,
              label: <Link href={"/order"}>Đơn hàng</Link>,
            },
            {
              key: "/infor",
              icon: <UploadOutlined />,
              label: <Link href={"/infor"}>Thông tin shop</Link>,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Row className="items-center" justify={"space-between"}>
            <Col span={12}>
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: "16px",
                  width: 64,
                  height: 64,
                }}
              />
            </Col>
            <Col span={12}>
              <Row
                className="items-center mr-2"
                justify={"end"}
                gutter={[0, 10]}
              >
                <Col>
                  <IoIosNotifications className="text-2xl" />
                </Col>
                <Col className="items-center flex">
                  <img
                    src={logo.src}
                    alt=""
                    className="w-14 mx-2 h-14 border-2 border-inherit rounded-full"
                  />
                  {shopInfor ? <p>shop name</p> : <p>Chưa có thông tin</p>}
                  <IoIosLogOut
                    onClick={() => logoutHandler()}
                    className="text-2xl mx-2 cursor-pointer text-red-500"
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default SidebarClient;
