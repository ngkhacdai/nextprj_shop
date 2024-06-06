"use client";
import { verifyOtp } from "@/api/Access";
import { Input, notification } from "antd";
import Title from "antd/es/skeleton/Title";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Otp = ({ isRegister, setIsRegister }) => {
  const [api, contextHolder] = notification.useNotification();
  const router = useRouter();

  const [count, setCount] = useState(50000);
  const openNotificationWithIcon = (content) => {
    api["error"]({
      message: "Notification Error",
      description: content,
    });
  };
  useEffect(() => {
    setTimeout(() => {
      setCount(count - 1);
    }, 1000);
  });
  const onChange = async (text) => {
    const form = {
      otp: text,
      email: isRegister.email,
      password: isRegister.password,
      role: "Shop",
    };
    await verifyOtp(form)
      .then((res) => {
        router.push("/login");
      })
      .catch(() => {
        openNotificationWithIcon("Mã OTP sai");
      });
  };
  const sharedProps = {
    onChange,
  };
  if (count === 0) {
    setCount(60);
    setIsRegister();
  }
  return (
    <div className="flex items-center justify-center h-4/5">
      {contextHolder}
      <div className="text-center">
        <Input.OTP formatter={(str) => str.toUpperCase()} {...sharedProps} />
        <p className="mt-3">Bạn có {count} giây để nhập mã OTP</p>
      </div>
    </div>
  );
};

export default Otp;
