import { Link, useNavigate } from "react-router-dom";
import "./formSignup.css";
import { GoogleLogin } from "@react-oauth/google";
import {
  googleLoginThunk,
  registerThunk,
} from "../../redux/features/auth/authThunk";
import { useAppDispatch } from "../../redux/hook";
import { useForm } from "react-hook-form";
import type { FormSignupValues } from "../../redux/features/auth/authTypes";
import { toast } from "react-toastify";

interface FormSignupProps {
  registerType: "User" | "Company" | null;
  setShowTypeSelector: (show: boolean) => void;
}

const FormSignup: React.FC<FormSignupProps> = ({
  registerType,
  setShowTypeSelector,
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormSignupValues>();

  const watchedPassword = watch("password");

  const onSubmit = async (data: FormSignupValues) => {
    const { email, password, name } = data;
    try {
      const resultAction = await dispatch(
        registerThunk({ name, email, password, role: registerType }) as any
      );

      if (registerThunk.fulfilled.match(resultAction)) {
        toast.success("Registration successful!");
        navigate("/login-page");
      } else {
        toast.error(resultAction.error.message || "Register failed");
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
          role: registerType as "User" | "Company" | null,
        }) as any
      );
      if (googleLoginThunk.fulfilled.match(resultAction)) {
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="name"
          placeholder="User Name"
          {...register("name", { required: true })}
        />
        <input
          type="email"
          placeholder="Email address"
          {...register("email", { required: true })}
        />
        <input
          type="password"
          placeholder="Password"
          {...register("password", { required: "Password is required" })}
        />
        {errors.password?.message && (
          <p className="error">{errors.password?.message}</p>
        )}

        <input
          type="password"
          placeholder="Confirm password"
          {...register("confirmPassword", {
            required: "Please confirm your password",
            validate: (value) =>
              value === watchedPassword || "Passwords do not match",
          })}
        />
        {errors.confirmPassword?.message && (
          <p className="error">{errors?.confirmPassword?.message}</p>
        )}
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
        {/* <FaFacebookF className="icon facebook" /> */}
        <GoogleLogin
          onSuccess={handleGoogleLogin}
          onError={() => alert("Google login failed")}
        />
        {/* <FaLinkedinIn className="icon linkedin" /> */}
      </div>
    </div>
  );
};

export default FormSignup;
