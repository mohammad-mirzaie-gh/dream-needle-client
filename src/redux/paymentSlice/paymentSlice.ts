import { payment_transactions as type_payment_transactions } from "@/type";
import { createSlice } from "@reduxjs/toolkit";
import {get_all_transaction , get_all_admin_transaction} from "./action";
interface state {
  transactions:
    | {
        currentPage: string;
        totalPages: number;
        data: type_payment_transactions[];
      }
    | "loading"
    | null;
  transaction: type_payment_transactions | "loading" | null;
}

const initialState: state = {
  transactions: "loading",
  transaction: "loading",
};

const payment = createSlice({
  name: "payment",
  initialState,
  reducers: {},
  extraReducers(build) {
    build
      .addCase(get_all_transaction.pending, (state) => {
        state.transactions = "loading";
      })
      .addCase(get_all_transaction.fulfilled, (state, action) => {
        state.transactions = action.payload;
      })
      .addCase(get_all_transaction.rejected, (state, action) => {
        state.transactions = null;
      })
      .addCase(get_all_admin_transaction.pending, (state) => {
        state.transactions = "loading";
      })
      .addCase(get_all_admin_transaction.fulfilled, (state, action) => {
        state.transactions = action.payload;
      })
      .addCase(get_all_admin_transaction.rejected, (state, action) => {
        state.transactions = null;
      });
  },
});

export default payment.reducer;
export const {} = payment.actions;
