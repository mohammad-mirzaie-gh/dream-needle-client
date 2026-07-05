import { order as type_order } from "@/type";
import { createSlice } from "@reduxjs/toolkit";
import {
  get_admin_one_order,
  get_all_admin_order,
  get_all_order,
  get_one_order,
} from "./action";
interface state {
  orders:
    | { currentPage: string; totalPages: number; data: type_order[] }
    | "loading"
    | null;
  order: type_order | "loading" | null;
}

const initialState: state = {
  orders: "loading",
  order: "loading",
};

const order = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers(build) {
    build
      .addCase(get_all_order.pending, (state) => {
        state.orders = "loading";
      })
      .addCase(get_all_order.fulfilled, (state, action) => {
        state.orders = action.payload;
      })
      .addCase(get_all_order.rejected, (state, action) => {
        state.orders = null;
      })
      .addCase(get_all_admin_order.pending, (state) => {
        state.orders = "loading";
      })
      .addCase(get_all_admin_order.fulfilled, (state, action) => {
        state.orders = action.payload;
      })
      .addCase(get_all_admin_order.rejected, (state, action) => {
        state.orders = null;
      })
      .addCase(get_one_order.pending, (state) => {
        state.orders = "loading";
      })
      .addCase(get_one_order.fulfilled, (state, action) => {
        state.order = action.payload.data;
      })
      .addCase(get_one_order.rejected, (state, action) => {
        state.order = null;
      })
      .addCase(get_admin_one_order.pending, (state) => {
        state.orders = "loading";
      })
      .addCase(get_admin_one_order.fulfilled, (state, action) => {
        state.order = action.payload.data;
      })
      .addCase(get_admin_one_order.rejected, (state, action) => {
        state.order = null;
      });
  },
});

export default order.reducer;
export const {} = order.actions;
