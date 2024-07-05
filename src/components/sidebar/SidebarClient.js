"use client";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { SiStatista } from "react-icons/si";
import logo from "@/assets/trustybuy.png";
import { Badge, Button, Col, Dropdown, Layout, Menu, Row, theme } from "antd";
import { useEffect, useState } from "react";
import { IoIosLogOut, IoIosNotifications, IoMdChatboxes } from "react-icons/io";
import { usePathname, useRouter } from "next/navigation";
import { signout } from "@/api/Access";
import { AiOutlineProduct } from "react-icons/ai";
import { RiBillFill } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import { socket } from "@/utils/socket";
import { getCookie } from "@/api/customFetch";

const { Header, Sider, Content } = Layout;

const SidebarClient = ({ children, cookie }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const router = useRouter();
  const [notification, setNotification] = useState([]);
  console.log("notification", notification);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const pathname = usePathname();

  useEffect(() => {
    // Initialize socket connection
    socket.connect();

    // Emit event to join notification room
    socket.emit("getNotification", { userId: cookie.userID });

    // Listen for notification events
    socket.on("notification", (data) => {
      setNotification(
        data?.noti?.map((item, index) => {
          return {
            key: `notification-${index}`,
            label: (
              <div
                className={`w-72 ${item.isRead === false && "bg-green-200"}`}
              >
                <p>{item.title}</p>
                <p>{item.content}</p>
              </div>
            ),
          };
        })
      );
    });
    socket.emit("notification", (data) => {
      setNotification(data?.noti);
    });

    // Cleanup on component unmount
    return () => {
      socket.off("notification");
      socket.disconnect();
    };
  }, []);

  const logoutHandler = async () => {
    await signout();
    router.push("/login");
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
    {
      key: "/chat",
      icon: <IoMdChatboxes />,
      label: "Tin nhắn",
    },
  ];

  return (
    <Layout>
      <Sider
        className="h-screen sticky top-0 hidden xs:block bg-white"
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <div className="demo-logo-vertical">
          <img alt="" src={logo.src} />
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
                <Col className="items-center mr-2 flex">
                  <Badge count={notification?.length}>
                    <IoIosNotifications className="text-2xl" />
                  </Badge>
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
                <Col className="items-center mr-2 flex">
                  <Dropdown
                    overlayStyle={{
                      padding: 0,
                    }}
                    menu={{ items: notification }}
                  >
                    <Badge count={notification?.length}>
                      <IoIosNotifications className="text-2xl" />
                    </Badge>
                  </Dropdown>
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
