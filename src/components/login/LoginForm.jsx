"use client";
import { login } from "@/api/Access";
import { Button, Form, Input, notification } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";
import logo from "@/assets/trustybuy.png";

const LoginForm = () => {
  const [api, contextHolder] = notification.useNotification();
  const router = useRouter();
  const openNotificationWithIcon = (content) => {
    api["error"]({
      message: "Notification Error",
      description: content,
    });
  };

  const onFinish = async (values) => {
    const form = {
      email: values.email,
      password: values.password,
      role: "Shop",
    };
    await login(form)
      .then((res) => {
        router.push("/");
      })
      .catch(() => {
        openNotificationWithIcon("Sai tài khoản hoặc mật khẩu");
      });
  };

  const onFinishFailed = (errorInfo) => {};

  return (
    <div className="">
      {contextHolder}

      <div className="w-full flex flex-col items-center justify-center max-w-md">
        <img src={logo.src} alt="Logo" className="w-24 h-24" />

        <p className="mb-2 text-2xl font-bold">Đăng nhập</p>
        <Form
          name="basic"
          className="w-full"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                min: 6,
                message: "Password must be at least 6 characters",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
