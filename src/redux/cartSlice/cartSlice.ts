import { cart as cartType } from "@/type";
import { createSlice } from "@reduxjs/toolkit";
import {
  create_cart,
  get_all_cart,
  get_count_all_cart,
  update_cart_item_count,
} from "./action";

interface stateProducts {
  cart_items: cartType[] | "loading" | null;
  cart_count_items: number | "loading" | null;
  loading_count_change_server: { id: string }[];
}

const initialState: stateProducts = {
  cart_items: "loading",
  cart_count_items: "loading",
  loading_count_change_server: [],
};

const cart = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(get_all_cart.fulfilled, (state, action) => {
        state.cart_items = action.payload.carts;
      })
      .addCase(get_all_cart.rejected, (state, action) => {
        state.cart_items = null;
      })
      .addCase(get_count_all_cart.pending, (state) => {
        state.cart_count_items = "loading";
      })
      .addCase(get_count_all_cart.fulfilled, (state, action) => {
        state.cart_count_items = action.payload.count;
      })
      .addCase(get_count_all_cart.rejected, (state, action) => {
        state.cart_count_items = null;
      })
      .addCase(create_cart.fulfilled, (_, action) => {
      })
      .addCase(create_cart.rejected, (_, action) => {
      })
      .addCase(update_cart_item_count.pending, (state, action) => {
        state.loading_count_change_server = [
          ...state.loading_count_change_server,
          { id: action.meta.arg.id },
        ];
      })
      .addCase(update_cart_item_count.fulfilled, (state, action) => {
        const arr = state.loading_count_change_server.filter((i) => {
          return action.meta.arg.id !== i.id;
        });
        state.loading_count_change_server = arr;
      })
      .addCase(update_cart_item_count.rejected, (state, action) => {
        const arr = state.loading_count_change_server.filter((i) => {
          return action.meta.arg.id !== i.id;
        });
        state.loading_count_change_server = arr;
      });
  },
});

export default cart.reducer;
export const {} = cart.actions;
