"use client";
import FooterRegister from "@/components/register/FooterRegister";
import Otp from "@/components/register/Otp";
import RegisterForm from "@/components/register/RegisterForm";
import { useState } from "react";
import logo from "@/assets/trustybuy.png";

const Register = () => {
  const [isRegister, setIsRegister] = useState();
  return (
    <div className="w-full">
      <div className="flex flex-col justify-center items-center ">
        <img src={logo.src} alt="Logo" className="w-24 h-24" />
      </div>
      {isRegister ? (
        <Otp
          isRegister={isRegister}
          setIsRegister={(values) => setIsRegister(values)}
        />
      ) : (
        <div>
          <RegisterForm setIsRegister={(values) => setIsRegister(values)} />
          {/* <FooterRegister /> */}
        </div>
      )}
    </div>
  );
};

export default Register;
