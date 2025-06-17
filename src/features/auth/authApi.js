import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQueryWithLogout } from "../baseQueryWithLogout.js";

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: baseQueryWithLogout,
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: "/users/login",
                method: "POST",
                body: credentials,
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: "/users/logout",
                method: "POST",
            }),
        }),
        register: builder.mutation({
            query: (userData) => ({
                url: "/users/signup",
                method: "POST",
                body: userData,
            }),
        }),
    }),
});

export const {
    useLoginMutation,
    useLogoutMutation,
    useRegisterMutation,
} = authApi;