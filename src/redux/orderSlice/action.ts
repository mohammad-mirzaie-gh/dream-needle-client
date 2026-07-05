import { instance_no_auth } from "@/configs/axios_config";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

interface ApiResponse {
  message: string;
}
export const get_all_admin_order = createAsyncThunk(
  "order/get_all_admin_order",
  async ({ page }: { page: string | number }, { rejectWithValue }) => {
    try {
      const result = await instance_no_auth.get(`/orders/admin${page ? `?page=${page}` : ""}`);
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
export const get_all_order = createAsyncThunk(
  "order/get_all_order",
  async ({ page }: { page: string | number }, { rejectWithValue }) => {
    try {
      const result = await instance_no_auth.get(
        `/orders${page ? `?page=${page}` : ""}`
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
export const get_admin_one_order = createAsyncThunk(
  "order/get_admin_one_order",
  async (obj: { id: string }, { rejectWithValue }) => {
    try {
      const result = await instance_no_auth.get(`/orders/admin/${obj.id}`);
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
export const get_one_order = createAsyncThunk(
  "order/get_one_order",
  async (obj: { id: string }, { rejectWithValue }) => {
    try {
      const result = await instance_no_auth.get(`/orders/${obj.id}`);
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
export const create_order = createAsyncThunk(
  "order/create_order",
  async (
    obj: {
      description: string;
      receiver_delivery: string;
      pay_ment: string;
      zip_code: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const result = await instance_no_auth.post(`/orders/`, obj);
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
export const update_order_information = createAsyncThunk(
  "order/update_order_information",
  async (
    obj: {
      user_description: string;
      receiver_delivery: string;
      pay_ment: string;
      zip_code: string;
      id: string;
      user : string
    },
    { rejectWithValue }
  ) => {
    try {
      const result = await instance_no_auth.put(`/orders/${obj.id}`, obj);
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
export const update_order_status = createAsyncThunk(
  "order/update_order_status",
  async (
    obj: {
      description: string;
      status: number;
      id: string;
      user : string
    },
    { rejectWithValue }
  ) => {
    try {
      const result = await instance_no_auth.put(
        `/orders/status/${obj.id}`,
        obj
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
export const delete_order = createAsyncThunk(
  "order/update_order_status",
  async (
    obj: {
      id: string;
      status : boolean
    },
    { rejectWithValue }
  ) => {
    try {
      const result = await instance_no_auth.post(`/orders/${obj.id}`,obj);
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
