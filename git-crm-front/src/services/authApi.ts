import { setLocalStorageItem } from "@/helpers/localStorage";
import { RootState } from "@/store/store";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface IBody {
  email: string;
  password: string;
}

interface IResponse {
  access_token: string;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  endpoints: (builder) => ({
    login: builder.mutation<IResponse, IBody>({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          setLocalStorageItem({ key: "JWT", value: data.access_token });
        } catch (err) {
          console.error("Sign In failed", err);
        }
      },
    }),
    register: builder.mutation<IResponse, IBody>({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body,
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          setLocalStorageItem({ key: "JWT", value: data.access_token });
        } catch (err) {
          console.error("Sign Up failed", err);
        }
      },
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;

export const useSelectAuthApi = (state: RootState) =>
  state[authApi.reducerPath];
