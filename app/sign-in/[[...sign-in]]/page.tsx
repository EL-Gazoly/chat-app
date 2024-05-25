import React from 'react';
import AuthCover from "../../auth/_components/AuthCover";
import LoginForm from "../_components/LoginForm";

const LoginPage = () => {
  return (
    <div className="max-w-full h-full grid grid-cols-12 overflow-hidden font-poppins">
      <AuthCover />
      <LoginForm />
    </div>
  );
};

export default LoginPage;
