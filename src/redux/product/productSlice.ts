import { product as product_type } from "@/type";
import { createSlice } from "@reduxjs/toolkit";
import {
  get_all_product,
  update_product_active,
  get_one_product,
} from "./action";

interface stateProducts {
  products:
    | "loading"
    | {
        count_users: number;
        currentPage: number;
        totalPages: number;
        products: product_type[];
      }
    | null;
  product: product_type | "loading" | null;
  product_cart_color:{id_product : string ,  color : string};
  product_cart_size: {id_product : string , size : string};
}

const initialState: stateProducts = {
  products: "loading",
  product: "loading",
  product_cart_color: {id_product : "" , color :""},
  product_cart_size: {id_product : "" , size :""},
};

const product = createSlice({
  name: "product",
  initialState,
  reducers: {
    stage_add_to_cart_color(state, action) {
      const { payload } = action;
      state.product_cart_color = payload;
    },
    stage_remove_to_cart_color(state) {
      state.product_cart_color = {id_product : "" , color :""};
    },
    stage_add_to_cart_size(state, action) {
      const { payload } = action;
      state.product_cart_size = payload;
    },
    stage_remove_to_cart_size(state) {
      state.product_cart_size = {id_product : "" , size :""};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(get_all_product.pending, (state) => {
        state.products = "loading";
      })
      .addCase(get_all_product.fulfilled, (state, action) => {
        state.products = action.payload;
      })
      .addCase(get_all_product.rejected, (state, action) => {
        state.products = null;
      })
      .addCase(get_one_product.pending, (state) => {
        state.products = "loading";
      })
      .addCase(get_one_product.fulfilled, (state, action) => {
        state.product = action.payload.data;
      })
      .addCase(get_one_product.rejected, (state, action) => {
        state.product = null;
      })
      .addCase(update_product_active.fulfilled, (state, action) => {
        state.products = action.payload.data;
      })
      .addCase(update_product_active.rejected, (state, action) => {
        state.products = null;
      });
  },
});

export default product.reducer;
export const {
  stage_add_to_cart_color,
  stage_add_to_cart_size,
  stage_remove_to_cart_color,
  stage_remove_to_cart_size,
} = product.actions;
