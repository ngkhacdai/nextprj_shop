"use client";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { SiStatista } from "react-icons/si";
import logo from "@/assets/trustybuy.png";
import { Button, Col, Layout, Menu, Row, theme } from "antd";
import { useEffect, useState } from "react";
import Link from "next/link";
import { IoIosLogOut, IoIosNotifications } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { fetchShopInfor } from "@/redux/slice/ShopSlice";
import { usePathname, useRouter } from "next/navigation";
import { signout } from "@/api/Access";
import { AiOutlineProduct } from "react-icons/ai";
import { RiBillFill } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";

const { Header, Sider, Content } = Layout;

const SidebarClient = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const shopInfor = useSelector((state) => state.shop.shopInFor);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(fetchShopInfor());
  }, [dispatch]);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const pathname = usePathname();

  const logoutHandler = async () => {
    await signout();
  };

  const handleMenuClick = (e) => {
    setMenuVisible(false);
    router.push(e.key);
  };

  const items = [
    {
      key: "/",
      icon: <SiStatista />,
      label: "Thống kê",
    },
    {
      key: "/product",
      icon: <AiOutlineProduct />,
      label: "Sản phẩm",
    },
    {
      key: "/order",
      icon: <RiBillFill />,
      label: "Đơn hàng",
    },
    {
      key: "/infor",
      icon: <CgProfile />,
      label: "Thông tin shop",
    },
  ];

  return (
    <Layout>
      <Sider
        className="h-screen sticky top-0  hidden xs:block bg-white"
        trigger={null}
        collapsible
        collapsed={collapsed}
        collapsedWidth={0}
      >
        <div className="demo-logo-vertical">
          <img alt="" src={logo.src} className="w-full h-40" />
        </div>
        <Menu
          mode="inline"
          defaultSelectedKeys={[pathname]}
          items={items}
          onClick={handleMenuClick}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
          className="z-10 sticky top-0"
        >
          <Row justify={"space-between"} className="items-center xs:hidden">
            <Col>
              <Button
                type="text"
                icon={
                  menuVisible ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />
                }
                onClick={() => setMenuVisible(!menuVisible)}
                style={{
                  fontSize: "16px",
                  width: 64,
                  height: 64,
                }}
              />
            </Col>
            <Col span={12}>
              <Row className="items-center mr-2" justify={"end"}>
                <Col>
                  <IoIosNotifications className="text-2xl" />
                </Col>
                <Col className="items-center flex">
                  <IoIosLogOut
                    onClick={() => logoutHandler()}
                    className="text-2xl mx-2 cursor-pointer text-red-500"
                  />
                </Col>
              </Row>
            </Col>
          </Row>
          <Row
            className="items-center hidden xs:flex"
            justify={"space-between"}
          >
            <Col span={3}>
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
              <Row className="items-center mr-2" justify={"end"}>
                <Col>
                  <IoIosNotifications className="text-2xl" />
                </Col>
                <Col className="items-center flex">
                  <IoIosLogOut
                    onClick={() => logoutHandler()}
                    className="text-2xl mx-2 cursor-pointer text-red-500"
                  />
                </Col>
              </Row>
            </Col>
          </Row>
          <div
            className={`md:hidden transition-max-height duration-300 z-10 ease-in-out ${
              menuVisible ? "max-h-screen" : "max-h-0 overflow-hidden"
            }`}
          >
            <Menu
              mode="inline"
              defaultSelectedKeys={[pathname]}
              items={items}
              style={{ width: "100%" }}
              className="z-10"
              onClick={handleMenuClick}
            />
          </div>
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
