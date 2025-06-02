import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const API_BASE_URL = "http://localhost:3000/api/v1/auth";

interface User {
  id: string;
  email: string;
  username: string;
}

interface SignupRequest {
  username: string;
  password: string;
  shopNames: string[];
}

interface LoginRequest {
  username: string;
  password: string;
}

interface AuthResponse {
  user: User;
  token: string;
  message: string;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    credentials: "include",
  }),

  tagTypes: ["User"],

  endpoints: (builder) => ({
    signup: builder.mutation<AuthResponse, SignupRequest>({
      query: (data) => ({
        url: "/signup",
        method: "POST",
        body: data,
      }),
    }),
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
    }),
    logout: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),
    getProfile: builder.query<User, void>({
      query: () => "/me",
      providesTags: ["User"],
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetProfileQuery,
} = authApi;
