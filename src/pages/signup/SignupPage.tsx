import LoginBanner from "../../component/login/LoginBanner";
import FormSignup from "../../component/signup/FormSignup";
import AuthTransitionWrapper from "../../component/shared/AuthTransitionWrapper";
import './signupPage.css';

const SignupPage = () => {
  return (
    <AuthTransitionWrapper>
      <div className="login-page">
        <div className="login-left">
          <LoginBanner />
        </div>
        <div className="login-right">
          <FormSignup />
        </div>
      </div>
    </AuthTransitionWrapper>
  );
};

export default SignupPage;
