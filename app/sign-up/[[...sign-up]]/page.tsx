import React from 'react';
import AuthCover from "@/app/auth/_components/AuthCover";
import RegisterForm from "@/app/sign-up/_components/RegisterForm";

const RegisterPage = () => {
  return (
    <div className="max-w-full h-full grid grid-cols-12 overflow-hidden font-poppins">
      <AuthCover />
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
