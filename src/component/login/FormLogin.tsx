import { Link, useNavigate } from "react-router-dom";
import { FaFacebookF, FaGoogle, FaLinkedinIn } from "react-icons/fa";
import "./formLogin.css";

const FormLogin = () => {
  const navigate = useNavigate();

  const handleCreateAccount = () => {
    navigate("/signup-page");
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
        <input type="email" placeholder="Email address" />
        <input type="password" placeholder="Password" />
        <div className="button-group">
          <button type="submit" className="btn-login">
            Login
          </button>
          <button
            type="button"
            className="btn-create"
            onClick={handleCreateAccount}
          >
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

export default FormLogin;
