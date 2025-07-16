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
}) => {
  // Tạo FormData thay vì JSON
  const formData = new FormData();
  formData.append("name", userInfo.name);
  formData.append("email", userInfo.email);
  formData.append("password", userInfo.password);

  const res = await fetch(`${AUTH_URL}/register`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) throw new Error("Register failed");
  return res.json();
};

export const googleLogin = async (tokenId: string) => {
  const res = await fetch(`${AUTH_URL}/google`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tokenId }),
  });
  if (!res.ok) throw new Error("Google login failed");
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
