import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { IUser } from "@/types/user";

interface UserState {
  user: IUser;
}

const initialState: UserState = {
  user: {} as IUser,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<IUser>) {
      state.user = action.payload;
    },
    clearUser(state) {
      state.user = {} as IUser;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export const useUserSelector = (state: RootState) => state.user.user;

export default userSlice.reducer;
