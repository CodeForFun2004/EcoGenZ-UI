// DÙNG API THẬT

// const BASE_URL = 'https://your-backend.com/api/auth';

// export const login = async (credentials: { email: string; password: string }) => {
//   const res = await fetch(`${BASE_URL}/login`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(credentials),
//   });
//   if (!res.ok) throw new Error('Login failed');
//   return res.json();
// };

// export const register = async (userInfo: { name: string; email: string; password: string }) => {
//   const res = await fetch(`${BASE_URL}/register`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(userInfo),
//   });
//   if (!res.ok) throw new Error('Register failed');
//   return res.json();
// };

// export const googleLogin = async (tokenId: string) => {
//   const res = await fetch(`${BASE_URL}/google`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ tokenId }),
//   });
//   if (!res.ok) throw new Error('Google login failed');
//   return res.json();
// };



// TEST DÙNG SERVER ẢO
const BASE_URL = 'http://localhost:5000/users';

export const login = async ({ email, password }: { email: string; password: string }) => {
  const res = await fetch(`${BASE_URL}?email=${email}&password=${password}`);
  const users = await res.json();

  if (users.length === 0) throw new Error('Invalid credentials');
  return users[0];
};

export const register = async ({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) => {
  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name,
      email,
      password,
      token: 'mock-token-' + Date.now(),
    }),
  });
  if (!res.ok) throw new Error('Register failed');
  return res.json();
};

export const googleLogin = async (tokenId: string) => {
  // Bạn có thể tuỳ chỉnh hoặc tích hợp Google SDK thật ở đây
  return {
    id: 'google-user-id',
    name: 'Google User',
    email: 'google@example.com',
    token: tokenId,
  };
};

