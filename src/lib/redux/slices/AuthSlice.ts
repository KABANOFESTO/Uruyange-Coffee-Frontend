import { apiSlice } from "./ApiSlice";

const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({ url: "users/login", method: "POST", body: data }),
        }),
        register: builder.mutation({
            query: (data) => ({ url: "/users", method: "POST", body: data }),
        }),
        getAllUsers: builder.query({
            query: () => ({ url: "/users", method: "GET" }),
        }),
    }),
});

export const { useLoginMutation, useRegisterMutation, useGetAllUsersQuery } = authApi;
