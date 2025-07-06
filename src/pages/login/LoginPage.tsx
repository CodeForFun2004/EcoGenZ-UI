// src/pages/LoginPage.jsx


import FormLogin from '../../component/login/FormLogin';
import LoginBanner from '../../component/login/LoginBanner';
import AuthTransitionWrapper from '../../component/shared/AuthTransitionWrapper';
import './loginPage.css';

const LoginPage = () => {
  return (
    <AuthTransitionWrapper>
    <div className="login-page">
      <div className="login-right">
        <FormLogin />
      </div>
      <div className="login-left">
        <LoginBanner />
      </div>
    </div>
    </AuthTransitionWrapper>
  );
};

export default LoginPage;
