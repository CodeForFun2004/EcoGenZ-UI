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
import { toast } from "react-toastify";

interface FormLoginProps {
  loginType: "User" | "Company" | null;
  setShowTypeSelector: (show: boolean) => void;
}

const FormLogin: React.FC<FormLoginProps> = ({
  loginType,
  setShowTypeSelector,
}) => {
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
          toast.success("Login successful!");
          navigate("/");
        } else {
          toast.error("Login response missing user data.");
          setShowTypeSelector(true);
        }
      } else {
        toast.error(resultAction.error.message || "Login failed1234");
        toast.info("select your type to login again!");
        setShowTypeSelector(true);
      }
    } catch {
      toast.error("An unexpected error occurred.");
      setShowTypeSelector(true);
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
        toast.success("Login successful!");
        navigate("/");
      } else {
        toast.error(resultAction.error.message || "Login failed1234");
        setShowTypeSelector(true);
      }
    } else {
      toast.error("Google credential is missing!");
      setShowTypeSelector(true);
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
