import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {
  loginThunk,
  googleLoginThunk,
} from "../../redux/features/auth/authThunk"; // cập nhật đúng path
// import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { GoogleLogin } from "@react-oauth/google";
import "./formLogin.css";

interface FormLoginProps {
  loginType: "User" | "Company" | null;
}

const FormLogin: React.FC<FormLoginProps> = ({ loginType }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const resultAction = await dispatch(
        loginThunk({ email, password }) as any
      );

      if (loginThunk.fulfilled.match(resultAction)) {
        const userData = resultAction.payload;
        if (userData) {
          // localStorage.setItem("user", JSON.stringify(userData));
          // localStorage.setItem("userId", userData.id);
          // console.log(userData);
          navigate("/");
        } else {
          alert("Login response missing user data.");
        }
      } else {
        alert(resultAction.error.message || "Login failed1234");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("An unexpected error occurred.");
    }
  };

  const handleGoogleLogin = async (credentialResponse: any) => {
    if (credentialResponse.credential) {
      const resultAction = await dispatch(
        googleLoginThunk({
          tokenId: credentialResponse.credential,
          role: loginType as "User" | "Company" | null,
        }) as any
      );
      if (googleLoginThunk.fulfilled.match(resultAction)) {
        navigate("/");
      } else {
        alert(resultAction.error.message || "Login failed1234");
      }
    } else {
      alert("Google credential is missing!");
    }
  };

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
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
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
        {/* <FaFacebookF className="icon facebook" /> */}
        <GoogleLogin
          onSuccess={handleGoogleLogin}
          onError={() => alert("Google login failedkkkk")}
        />
        {/* <FaLinkedinIn className="icon linkedin" /> */}
      </div>
    </div>
  );
};

export default FormLogin;
