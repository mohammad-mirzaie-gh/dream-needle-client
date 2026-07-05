import { instance_no_auth } from "@/configs/axios_config";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

interface ApiResponse {
  message: string;
}

export const get_all_cart = createAsyncThunk(
  "cart/get_all_cart",
  async (_, { rejectWithValue }) => {
    try {
      const result = await instance_no_auth.get(`/carts`);
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
export const get_count_all_cart = createAsyncThunk(
  "cart/get_count_all_cart",
  async (_, { rejectWithValue }) => {
    try {
      const result = await instance_no_auth.get(`/carts/count_item`);
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

export const create_cart = createAsyncThunk(
  "cart/create_cart",
  async (
    obj: { count: number; color: string; size: string; product: string },
    { rejectWithValue }
  ) => {
    try {
      const result = await instance_no_auth.post(`/carts`, obj);
      return result.data;
    } catch (err) {
      const error = err as AxiosError;
      const responseData = error.response?.data as ApiResponse;
      toast.error(String(responseData.message));
      return rejectWithValue({
        message: responseData.message,
      });
    }
  }
);

export const update_cart_item_count = createAsyncThunk(
  "cart/update_cart_item_count",
  async (
    {
      id,
      count,
    }: {
      id: string;
      count: number;
    },
    { rejectWithValue }
  ) => {
    try {
      const result = await instance_no_auth.put(`/carts/${id}`, { count });
      return result.data;
    } catch (err) {
      const error = err as AxiosError;
      const responseData = error.response?.data as ApiResponse;
      toast.error(String(responseData.message));
      return rejectWithValue({
        message: responseData.message,
      });
    }
  }
);
export const delete_cart_item = createAsyncThunk(
  "cart/delete_cart_item",
  async (
    {
      id,
    }: {
      id: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const result = await instance_no_auth.delete(`/carts/${id}`);
      return result.data;
    } catch (err) {
      const error = err as AxiosError;
      const responseData = error.response?.data as ApiResponse;
      toast.error(String(responseData.message));
      return rejectWithValue({
        message: responseData.message,
      });
    }
  }
);