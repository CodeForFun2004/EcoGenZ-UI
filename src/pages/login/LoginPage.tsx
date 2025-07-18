// src/pages/LoginPage.jsx

import { useState } from "react";
import FormLogin from "../../component/login/FormLogin";
import LoginBanner from "../../component/login/LoginBanner";
import AuthTransitionWrapper from "../../component/shared/AuthTransitionWrapper";
import "./loginPage.css";
import OverlaySelectRole from "../../component/overlay-select-role/overlay";

const LoginPage = () => {
  const [loginType, setLoginType] = useState<"User" | "Company" | null>(null);
  const [showTypeSelector, setShowTypeSelector] = useState(true);

  return (
    <AuthTransitionWrapper>
      <div className="login-page">
        <div className="login-right">
          <FormLogin loginType={loginType} />
        </div>
        <div className="login-left">
          <LoginBanner />
        </div>
      </div>
      {showTypeSelector && (
        <OverlaySelectRole
          setType={setLoginType}
          setShowTypeSelector={setShowTypeSelector}
          page="login"
        />
      )}
    </AuthTransitionWrapper>
  );
};

export default LoginPage;
