import { instance_no_auth } from "@/configs/axios_config";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

interface ApiResponse {
  message: string;
}

export const get_all_product = createAsyncThunk(
  "product/get_all_product",
  async (
    {
      limit,
      page,
      category,
    }: {
      limit: string | number;
      page: string | number;
      category: string | number;
    },
    { rejectWithValue }
  ) => {
    try {
      const result = await instance_no_auth.get(
        `/products?limit=${limit}&page=${page}${
          category ? `&category=${category}` : ""
        }`
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
export const get_one_product = createAsyncThunk(
  "product/get_one_product",
  async (
    {
      id,
    }: {
      id: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const result = await instance_no_auth.get(`/products/${id}`);
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
export const update_product_active = createAsyncThunk(
  "product/update_product",
  async (
    {
      id,
      active,
    }: {
      id: string;
      active: boolean;
    },
    { rejectWithValue }
  ) => {
    try {
       const [res1 , res2] = await Promise.all([await instance_no_auth.post(`/products/${id}`, { active }),
       await instance_no_auth.get(
        `/products?limit=10&page=1`
      )])
      return {res1 , data:res2.data};
    } catch (err) {
      const error = err as AxiosError;
      const responseData = error.response?.data as ApiResponse;
      return rejectWithValue({
        message: responseData.message,
      });
    }
  }
);
