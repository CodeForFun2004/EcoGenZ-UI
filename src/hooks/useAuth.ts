import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import type { RootState } from "../redux/store";

const COMPANY_ROLE_NAME = "Company";

export const useAuth = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  return {
    user,
    isAuthenticated: !!user,
    isCompany: user?.role?.toLowerCase() === COMPANY_ROLE_NAME.toLowerCase(),
  };
};

export const useRequireAuth = (redirectTo: string = "/login") => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(redirectTo);
    }
  }, [isAuthenticated, navigate, redirectTo]);

  return { isAuthenticated };
};

export const useRequireCompanyRole = (redirectTo: string = "/") => {
  const navigate = useNavigate();
  const { isAuthenticated, isCompany } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (!isCompany) {
      navigate(redirectTo);
    }
  }, [isAuthenticated, isCompany, navigate, redirectTo]);

  return { isAuthenticated, isCompany };
};
