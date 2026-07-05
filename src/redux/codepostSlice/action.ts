import { instance_no_auth } from "@/configs/axios_config";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

interface ApiResponse {
  message: string;
}
export const get_all_code_post = createAsyncThunk(
  "code_post/get_all_code_post",
  async (_, { rejectWithValue }) => {
    try {
      const result = await instance_no_auth.get(`/zip_codes`);
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
export const create_code_post = createAsyncThunk(
  "code_post/create_code_post",
  async (obj: { title: string; postal_code: string }, { rejectWithValue }) => {
    try {
      const result = await instance_no_auth.post(`/zip_codes`, obj);
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
export const delete_code_post = createAsyncThunk(
  "code_post/delete_code_post",
  async (obj: { id: string }, { rejectWithValue }) => {
    try {
      const result = await instance_no_auth.put(`/zip_codes/${obj.id}`);
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
