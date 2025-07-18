// DÙNG API THẬT

const AUTH_URL = import.meta.env.VITE_AUTH_URL;

export const login = async (credentials: {
  email: string;
  password: string;
}) => {
  const res = await fetch(`${AUTH_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  if (!res.ok) throw new Error("Login failed");
  return res.json();
};

export const register = async (userInfo: {
  name: string;
  email: string;
  password: string;
  role: "User" | "Company" | null;
}) => {
  // Tạo FormData thay vì JSON
  const formData = new FormData();
  formData.append("name", userInfo.name);
  formData.append("email", userInfo.email);
  formData.append("password", userInfo.password);
  formData.append("role", userInfo.role ?? "");

  const res = await fetch(`${AUTH_URL}/register`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) {
    const errorRes = await res.json();
    // Nếu backend có trả về errorMessages
    const messages =
      errorRes.errorMessages?.join("\n") ||
      "Register failed because of unknown error";
    throw new Error(messages);
  }
  return res.json();
};

export const googleLogin = async (
  tokenId: string,
  role: "User" | "Company" | null
) => {
  const res = await fetch(`${AUTH_URL}/google`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tokenId, role }),
  });
  if (!res.ok) {
    const errorRes = await res.json();
    // Nếu backend có trả về errorMessages

    const messages =
      errorRes.errorMessages?.join("\n") ||
      "Google login failed because of unknown error";
    throw new Error(messages);
  }

  return res.json();
};
export const getUserById = async (id: string) => {
  const res = await fetch(`${AUTH_URL}/get-user/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch user by ID");
  }
  const data = await res.json();
  return data.result;
};

export const getuserWithPoint = async () => {
  const res = await fetch(`${AUTH_URL}/userWithPoint`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch user with point");
  }
  const data = await res.json();
  return data.result;
};
