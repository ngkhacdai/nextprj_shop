"use client";
import { Button, Radio } from "antd";
import { useState } from "react";
import LoginForm from "./LoginForm";
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
        className="md:hidden block mb-4"
        onChange={changeForm}
        defaultValue={animation ? "register" : "login"}
      >
        <Radio.Button value="login">Đăng nhập</Radio.Button>
        <Radio.Button value="register">Đăng ký</Radio.Button>
      </Radio.Group>
      <div className="h-full w-full flex justify-center">
        <div
          className={`w-full h-full flex flex-col md:border-inherit md:border-r-2 items-center justify-center relative ${
            animation ? " md:flex hidden bg-white " : ""
          }`}
        >
          <div
            className={`absolute top-1/2 hidden transition ${
              !animation ? "md:hidden" : "md:block animate-popUp"
            }`}
          >
            <div className="flex flex-col justify-center items-center">
              <span className="text-2xl font-bold text-gray-800">
                Bạn đã có tài khoản!
              </span>
              <Button
                className="bg-green-500 hover:bg-green-600 text-white mt-4"
                onClick={() => setAnimation(false)}
              >
                Đăng nhập
              </Button>
            </div>
          </div>
          <div
            className={`md:w-1/2 w-full ${
              animation
                ? "animate-changeFormRegister md:block hidden"
                : "animate-changeFormLogin1"
            }`}
          >
            <LoginForm />
          </div>
        </div>
        <div
          className={`w-full h-full flex flex-col md:border-inherit md:border-l-2 items-center justify-center relative ${
            !animation ? " md:flex hidden bg-white" : ""
          }`}
        >
          <div
            className={`hidden absolute top-1/2 ${
              animation ? "md:hidden" : "md:block animate-popUp"
            }`}
          >
            <div className="flex flex-col justify-center items-center">
              <span className="text-2xl font-bold text-gray-800">
                Bạn chưa có tài khoản?
              </span>
              <Button
                className="bg-green-500 hover:bg-green-600 text-white w-20 mt-4"
                onClick={() => setAnimation(true)}
              >
                Đăng ký
              </Button>
            </div>
          </div>
          <div
            className={`md:w-1/2 w-full ${
              !animation
                ? "animate-changeFormRegister1 md:block hidden"
                : "animate-changeFormLogin"
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
