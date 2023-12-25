import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/slices/authSlice";

const storeApp = configureStore({
  reducer: { auth: authReducer },
});

export default storeApp;
