"use client";
import { register } from "@/api/Access";
import { Button, Form, Input, notification } from "antd";

const RegisterForm = ({ setIsRegister }) => {
  const [api, contextHolder] = notification.useNotification();

  const onFinish = async (values) => {
    const sliceEmail = values.email.split("@");
    const match = /^[a-zA-Z0-9._%+-]+$/;
    if (
      sliceEmail.length !== 2 ||
      sliceEmail[1] !== "gmail.com" ||
      !sliceEmail[0].match(match)
    ) {
      return openNotificationWithIcon(
        "Email phải có định dạng như sau (nguyenvana@gmail.com)"
      );
    }
    if (values.password !== values.comPassword) {
      return openNotificationWithIcon("Mật khẩu phải giống nhập lại mật khẩu");
    }
    const form = {
      email: values.email,
      password: values.password,
      role: "Shop",
    };
    await register(form)
      .then(() => {
        setIsRegister(values);
      })
      .catch((error) => {
        console.log(error);
        return openNotificationWithIcon("Email đã tồn tại!");
      });
  };

  const openNotificationWithIcon = (content) => {
    api.error({
      message: "Notification Error",
      description: content,
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="w-full ">
      {contextHolder}
      <p className="mb-5 text-2xl font-bold">Đăng ký</p>
      <Form
        name="basic"
        className="w-full"
        onFinish={onFinish}
        layout="vertical"
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
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
        <Form.Item
          label="Confirm Password"
          name="comPassword"
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
            Đăng ký
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegisterForm;
