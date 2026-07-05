import { createSlice } from "@reduxjs/toolkit";
import {
  change_password_whit_email_getCode,
  change_password_with_password,
  get_is_login,
  log_out,
  get_all_user,
  get_one_user,
} from "./action";
import { user as user_type } from "./../../type";

interface state {
  user: user_type | null;
  information_user: user_type | "loading" | null;
  loading: boolean;
  is_sendEmail: boolean;
  loading_email_code: boolean;
  method_email: "get" | "verify";
  users:
    | "loading"
    | {
        count_users: number;
        currentPage: number;
        totalPages: number;
        users: user_type[];
      }
    | null;
}

const initialState: state = {
  user: {
    _id: "",
    name: "",
    lastname: "",
    role: null,
    email: "",
    phone: "",
    phone_verify: false,
    email_verify: false,
    address: "",
    createdAt: "",
    updatedAt: "",
  },
  information_user: "loading",
  loading: false,
  is_sendEmail: false,
  loading_email_code: false,
  method_email: "get",
  users: "loading",
};

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    setBoolean(state, action) {
      state.is_sendEmail = action.payload;
    },
    set_method_email(state, action) {
      state.method_email = action.payload;
    },
  },
  extraReducers: (build) => {
    build
      .addCase(get_is_login.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(get_is_login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
      })
      .addCase(get_is_login.rejected, (state, action) => {
        state.loading = false;
        state.user = {
          _id: "",
          name: "",
          lastname: "",
          role: null,
          email: "",
          phone: "",
          phone_verify: false,
          email_verify: false,
          address: "",
          createdAt: "",
          updatedAt: "",
        };
      })
      .addCase(log_out.fulfilled, (state, action) => {
        state.user = null;
      })
      .addCase(log_out.rejected, (_, action) => {
      })
      .addCase(change_password_whit_email_getCode.pending, (state) => {
        if (state.method_email === "get") {
          state.loading_email_code = true;
        }
      })
      .addCase(
        change_password_whit_email_getCode.fulfilled,
        (state, action) => {
          state.loading_email_code = false;
        }
      )
      .addCase(change_password_whit_email_getCode.rejected, (state) => {
        state.loading_email_code = false;
      })
      .addCase(change_password_with_password.pending, (state) => {
        if (state.method_email === "get") {
          state.loading_email_code = true;
        }
      })
      .addCase(change_password_with_password.fulfilled, (state, action) => {
        state.loading_email_code = false;
      })
      .addCase(change_password_with_password.rejected, (state, action) => {
        state.loading_email_code = false;
      })
      .addCase(get_all_user.pending, (state) => {
        state.users = "loading";
      })
      .addCase(get_all_user.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(get_all_user.rejected, (state, action) => {
        state.user = null;
      })
      .addCase(get_one_user.pending, (state) => {
        state.information_user = "loading";
      })
      .addCase(get_one_user.fulfilled, (state, action) => {
        state.information_user = action.payload.data;
      })
      .addCase(get_one_user.rejected, (state, action) => {
        state.information_user = null;
      });
  },
});

export default user.reducer;
export const { setBoolean, set_method_email } = user.actions;
