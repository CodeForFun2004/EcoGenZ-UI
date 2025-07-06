import { FaFacebookF, FaGoogle, FaLinkedinIn } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import './formSignup.css'


const FormSignup = () => {
  const navigate = useNavigate();

  const handleLoginAccount = () => {
    navigate("/login-page");
  };

  return (
    <div className="form-login">
      <div className="logo">
      <Link to="/">
        <span className="icon">🌿</span>
        <span className="brand">Eco Gen Z</span>
        </Link>
      </div>
      <h2>
        Join the movement,
        <br />
        <strong>act for the planet</strong>
      </h2>
      <p>Empower change through green ideas and actions</p>
      <form>
        <input type="text" placeholder="Full Name" />
        <input type="email" placeholder="Email address" />
        <input type="password" placeholder="Password" />
        <input type="password" placeholder="Confirm password" />
        <div className="button-group">
          <button
            type="button"
            onClick={handleLoginAccount}
            className="btn-login1"
          >
            Login
          </button>
          <button type="submit" className="btn-create1">
            Create account
          </button>
        </div>
      </form>
      <p className="login-alt">Or login with</p>
      <div className="social-icons">
        <FaFacebookF className="icon facebook" />
        <FaGoogle className="icon google" />
        <FaLinkedinIn className="icon linkedin" />
      </div>
    </div>
  );
};

export default FormSignup;
