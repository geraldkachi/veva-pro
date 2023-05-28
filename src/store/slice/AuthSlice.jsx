import { createSlice } from "@reduxjs/toolkit";
import { openNotification } from "../../utils/helpers";

const initialState = {
  user: null,
  token: "",
  errorMessage: "",
  message: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserDetails: (state, { payload: { user } }) => {
      state.user = user;
    },
    updateUserDetails: (state, { payload: { user } }) => {
      state.user = user;
    },
    setUserToken: (state, { payload: { token } }) => {
      state.token = token;
    },
    logOut: (state) => {
      if (state.user) {
        openNotification({
          type: "success",
          title: "Log Out",
          message: `Log Out Successful`,
        });
      }
      state.token = "";
      state.user = null;
      window.localStorage.clear();

      // let redirectTo = window.location.pathname;
      // window.location.href = `/login?redirectTo=${redirectTo}`;
    },
  },
});

const { actions, reducer } = authSlice;
export const { setUserDetails, logOut, setUserToken, updateUserDetails } =
  actions;

export const logout = () => {
  window.localStorage.clear();
  window.location.href = `/login`;
};
export const logoutAdmin = () => {
  window.localStorage.clear();
  window.location.href = `/admin/login`;
};
// selector to select user details from the store
export const selectCurrentUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;

export default reducer;
