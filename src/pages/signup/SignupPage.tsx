import LoginBanner from "../../component/login/LoginBanner";
import FormSignup from "../../component/signup/FormSignup";
import AuthTransitionWrapper from "../../component/shared/AuthTransitionWrapper";
import "./signupPage.css";
import { useState } from "react";
import OverlaySelectRole from "../../component/overlay-select-role/overlay";

const SignupPage = () => {
  const [RegisterType, setRegisterType] = useState<"User" | "Company" | null>(
    null
  );
  const [showTypeSelector, setShowTypeSelector] = useState(true);

  return (
    <AuthTransitionWrapper>
      <div className="login-page">
        <div className="login-left">
          <LoginBanner />
        </div>
        <div className="login-right">
          <FormSignup registerType={RegisterType} />
        </div>
      </div>
      {showTypeSelector && (
        <OverlaySelectRole
          setType={setRegisterType}
          setShowTypeSelector={setShowTypeSelector}
          page="signup"
        />
      )}
    </AuthTransitionWrapper>
  );
};

export default SignupPage;
