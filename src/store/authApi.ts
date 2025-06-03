import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setUser } from "./authSlice";
const API_BASE_URL = "http://localhost:3000/api/v1/auth";

interface User {
  id: string;
  shopNames: string[];
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
  remember?: boolean;
}

interface AuthResponse {
  user: User;
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
      invalidatesTags: ["User"],
    }),
    logout: builder.mutation<{ message: string }, void>({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
      invalidatesTags:["User"]
    }),

    getProfile: builder.query<{ data: User }, void>({
      query: () => "/me",
      providesTags: ["User"],
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const { username, id, shopNames } = data?.data || {};

          dispatch(
            setUser({
              user: { id, username, shopNames },
            })
          );
        } catch (err) {
          // handle error if needed
        }
      },
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetProfileQuery,
} = authApi;
