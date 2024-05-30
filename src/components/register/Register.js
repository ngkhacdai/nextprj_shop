"use client";
import FooterRegister from "@/components/register/FooterRegister";
import Otp from "@/components/register/Otp";
import RegisterForm from "@/components/register/RegisterForm";
import { useState } from "react";

const Register = () => {
  const [isRegister, setIsRegister] = useState();
  return (
    <div className="text-center mt-52">
      {isRegister ? (
        <Otp
          isRegister={isRegister}
          setIsRegister={(values) => setIsRegister(values)}
        />
      ) : (
        <div>
          <RegisterForm setIsRegister={(values) => setIsRegister(values)} />
          <FooterRegister />
        </div>
      )}
    </div>
  );
};

export default Register;
