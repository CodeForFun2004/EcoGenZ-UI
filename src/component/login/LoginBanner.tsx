import './LoginBanner.css';
import loginBanner from '../../assets/img/authenticate/login-banner.png'

const LoginBanner = () => {
  return (
    <div className="login-banner">
      <img
        src={loginBanner}
        alt="Eco Learning Illustration"
      />
    </div>
  );
};

export default LoginBanner;
