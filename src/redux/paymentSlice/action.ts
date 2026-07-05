import { instance_no_auth } from "@/configs/axios_config";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

interface ApiResponse {
  message: string;
}
export const get_way_payment = createAsyncThunk(
  "payment/get_way_payment",
  async (obj: { order_id: string; payment: string }, { rejectWithValue }) => {
    try {
      const result = await instance_no_auth.get(
        `/payments/${obj.payment}/${obj.order_id}`
      );
      return result.data;
    } catch (err) {
      const error = err as AxiosError;
      const responseData = error.response?.data as ApiResponse;
      return rejectWithValue({
        message: responseData.message,
      });
    }
  }
);
export const get_all_transaction = createAsyncThunk(
  "payment/get_all_transaction",
  async ({ page }: { page: string | number }, { rejectWithValue }) => {
    try {
      const result = await instance_no_auth.get(
        `/payments${page ? `?page=${page}` : ""}`
      );
      return result.data;
    } catch (err) {
      const error = err as AxiosError;
      const responseData = error.response?.data as ApiResponse;
      return rejectWithValue({
        message: responseData.message,
      });
    }
  }
);
export const get_all_admin_transaction = createAsyncThunk(
  "payment/get_all_admin_transaction",
  async ({ page }: { page: string | number }, { rejectWithValue }) => {
    try {
      const result = await instance_no_auth.get(
        `/payments/admin${page ? `?page=${page}` : ""}`
      );
      return result.data;
    } catch (err) {
      const error = err as AxiosError;
      const responseData = error.response?.data as ApiResponse;
      return rejectWithValue({
        message: responseData.message,
      });
    }
  }
);