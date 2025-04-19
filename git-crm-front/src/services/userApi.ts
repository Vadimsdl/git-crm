import { getLocalStorageItem } from "@/helpers/localStorage";
import { RootState } from "@/store/store";
import { setUser } from "@/store/userSlice";
import { IUser } from "@/types/user";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    prepareHeaders: (headers) => {
      const token = getLocalStorageItem({ key: "JWT" });
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    user: builder.query<IUser, void>({
      query: () => "/user/me",
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
        } catch (err) {
          console.error("Error on load user info", err);
        }
      },
    }),
  }),
});

export const { useUserQuery } = userApi;

export const useSelectUserApi = (state: RootState) =>
  state[userApi.reducerPath];
