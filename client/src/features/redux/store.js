import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/slices/authSlice";
import { authAPI } from "./services/authService";

const storeApp = configureStore({
  reducer: { auth: authReducer, [authAPI.reducerPath]: authAPI.reducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authAPI.middleware),
});

export default storeApp;
