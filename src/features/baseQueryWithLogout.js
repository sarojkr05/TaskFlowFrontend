// services/baseQueryWithLogout.js
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { logout } from "./auth/authSlice.js";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://taskflowbackend-cbxp.onrender.com",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseQueryWithLogout = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  // 🔒 If unauthorized, logout and redirect
  if (result?.error?.status === 401) {
    api.dispatch(logout());
    window.location.href = "/login"; // or use navigate if inside a component
  }

  return result;
};
