import { authApi } from "features/services/authService";
import authReducer from "../redux/slices/authSlice";
import { configureStore } from "@reduxjs/toolkit";

const storeApp = configureStore({
  reducer: { auth: authReducer, [authApi.reducerPath]: authApi.reducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export default storeApp;
