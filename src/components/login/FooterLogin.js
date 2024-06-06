"use client";
import { Button, Radio } from "antd";
import Link from "next/link";
import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "../register/RegisterForm";
import Register from "../register/Register";

const FooterLogin = () => {
  const [animation, setAnimation] = useState(false);

  const changeForm = (value) => {
    if (value.target.value === "login") {
      setAnimation(false);
    } else {
      setAnimation(true);
    }
  };
  return (
    <div className="w-5/6 h-4/5 border-inherit rounded-lg bg-white shadow-lg border-2 p-2">
      <Radio.Group
        className="xs:hidden block"
        onChange={changeForm}
        defaultValue="login"
      >
        <Radio.Button value="login">Đăng nhập</Radio.Button>
        <Radio.Button value="register">Đăng ký</Radio.Button>
      </Radio.Group>
      <div className="h-full w-full flex justify-center">
        <div className="w-full h-full flex flex-col items-center justify-center relative">
          <div
            className={`absolute top-1/2 hidden transition ${
              !animation ? "xs:hidden" : "xs:block"
            }`}
          >
            <span>Bạn đã có tài khoản!</span>
            <Button onClick={() => setAnimation(false)}>Đăng nhập</Button>
          </div>

          <div
            className={`xs:w-1/2 w-full ${
              animation
                ? "animate-changeFormRegister xs:block hidden"
                : "animate-changeFormLogin1"
            }`}
          >
            <LoginForm />
          </div>
        </div>
        <div className="w-full h-full flex flex-col items-center justify-center relative">
          <div
            className={`hidden absolute top-1/2 ${
              animation ? "xs:hidden" : "xs:block"
            }`}
          >
            <span>Bạn chưa có tài khoản?</span>
            <Button onClick={() => setAnimation(true)}>Đăng ký</Button>
          </div>
          <div
            className={`xs:w-1/2 w-full ${
              !animation
                ? "animate-changeFormRegister1 xs:block hidden"
                : "animate-changeFormLogin "
            }`}
          >
            <Register />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterLogin;
