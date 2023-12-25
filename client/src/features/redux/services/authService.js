import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials } from "../slices/authSlice";

// Define a service using a base URL and expected endpoints
export const authAPI = createApi({
  reducerPath: "authAPI",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_END_POINT }),
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (payload) => ({
        url: `/register`,
        method: "POST",
        body: payload,
      }),
    }),
    login: builder.mutation({
      query: (payload) => ({
        url: `/auth/login`,
        method: "POST",
        body: payload,
      }),
    }),
    refresh: builder.mutation({
      query: () => ({
        url: "/auth/refresh",
        method: "GET",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
          const { accessToken } = data;
          dispatch(setCredentials({ accessToken }));
        } catch (err) {
          console.log(err);
        }
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useCreateUserMutation, useLoginMutation, useRefreshMutation } =
  authAPI;
