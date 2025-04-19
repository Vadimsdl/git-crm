import { authApi } from "@/services/authApi";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import projectsSlice from "./projectsSlice";
import userSlice from "./userSlice";
import { userApi } from "@/services/userApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { projectsApi } from "@/services/projectsApi";

const rootReducer = combineReducers({
  projects: projectsSlice,
  user: userSlice,
  [authApi.reducerPath]: authApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
  [projectsApi.reducerPath]: projectsApi.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      userApi.middleware,
      projectsApi.middleware,
    ),
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
