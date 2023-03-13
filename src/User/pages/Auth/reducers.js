import { createSlice } from "@reduxjs/toolkit";
import { checkAdminToken, checkUserToken } from "../../../utils/apisauce";
import { NotificationManager } from "react-notifications";

const slice = createSlice({
  name: "login",
  initialState: {
    loading: false,
    username: "",
    password: "",
    error: "",
    profile: null,
    signUp: false,
    reset: false,
    // authenticated: checkToken(),
  },
  reducers: {
    login: (state, { payload }) => {
      state.loading = true;
      state.username = payload.email;
      state.password = payload.password;
    },
    loginSuccess: (state, { payload }) => {
      state.loading = false;
      if (payload.result.role === "Admin") {
        localStorage.setItem("adminToken", payload.token);
        state.profile = payload.result;
        localStorage.removeItem("userToken");
        localStorage.removeItem("user_id");
        checkAdminToken();
        setTimeout(() => {
          window.location.replace("/admin/dashboard");
        }, 700);
      } else if (payload.result.role === "User") {
        localStorage.setItem("userToken", payload.token);
        localStorage.setItem("user_id", payload.result._id);
        state.profile = payload.result;
        localStorage.removeItem("adminToken");
        checkUserToken();
        setTimeout(() => {
          window.location.replace("/user/profile");
        }, 700);
      }
      NotificationManager.success("Successfully logged in");
    },
    loginFailed: (state, { payload }) => {
      NotificationManager.error(payload.message);
    },
    signup: (state, { payload }) => {
      state.loading = true;
      state.username = payload.email;
      state.password = payload.password;
    },
    signupSuccess: (state, { payload }) => {
      state.loading = false;
      if (payload.result.role === "User") {
        state.profile = payload.result;
        state.signUp = true;
      }
      NotificationManager.success("Successfully Signed up");
    },
    signupFailed: (state, { payload }) => {
      NotificationManager.error(payload.message);
    },
    forgotPass: (state, { payload }) => {},
    forgotPassSuccess: (state, { payload }) => {
      NotificationManager.success("Email sent successfully");
    },
    forgotPassFailed: (state, { payload }) => {
      NotificationManager.error(payload.message);
    },
    resetPass: (state, payload) => {},
    resetPassSuccess: (state, { payload }) => {
      NotificationManager.success("Password updated successfully");
    },
    resetPassFailed: (state, { payload }) => {
      NotificationManager.error(payload.message);
    },
  },
});

export const {
  login,
  loginSuccess,
  loginFailed,
  signup,
  signupSuccess,
  signupFailed,
  resetPass,
  resetPassSuccess,
  resetPassFailed,
  forgotPass,
  forgotPassSuccess,
  forgotPassFailed,
} = slice.actions;

export default slice.reducer;
