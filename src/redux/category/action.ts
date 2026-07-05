import { instance_no_auth } from "@/configs/axios_config";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

interface ApiResponse {
  message: string;
}
export const get_all_category = createAsyncThunk(
  "category/get_all_category",
  async (_, { rejectWithValue }) => {
    try {
      const result = await instance_no_auth.get(`/categories`);
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
export const create_category = createAsyncThunk(
  "category/create_category",
  async (
    {
      data,
    }: {
      data: {
        title: string;
        description: string;
        category_parent: string | null;
        type: string[];
        is_original: boolean;
        image?: File;
      };
    },
    { rejectWithValue }
  ) => {
    try {
      const [result, new_result] = await Promise.all([
        await instance_no_auth.post(`/categories`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }),
        await instance_no_auth.get(`/categories`),
      ]);
      return { res: result.data, new_data: new_result.data };
    } catch (err) {
      const error = err as AxiosError;
      const responseData = error.response?.data as ApiResponse;
      return rejectWithValue({
        message: responseData.message,
      });
    }
  }
);
export const get_one_category = createAsyncThunk(
  "category/get_one_category",
  async ({ id }: { id: string }, { rejectWithValue }) => {
    try {
      const result = await instance_no_auth.get(`/categories/${id}`);
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
export const edit_one_category = createAsyncThunk(
  "category/edit_one_category",
  async (
    {
      id,
      data,
    }: {
      id: string;
      data: {
        title: string;
        description: string;
        is_original: boolean;
        image: File;
      };
    },
    { rejectWithValue }
  ) => {
    try {
      const [result, new_result] = await Promise.all([
        await instance_no_auth.put(`/categories/${id}`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }),
        await instance_no_auth.get(`/categories/${id}`),
      ]);
      return { res: result.data, new_data: new_result.data };
    } catch (err) {
      const error = err as AxiosError;
      const responseData = error.response?.data as ApiResponse;
      return rejectWithValue({
        message: responseData.message,
      });
    }
  }
);
export const delete_category = createAsyncThunk(
  "category/delete_category",
  async ({ id }: { id: string }, { rejectWithValue }) => {
    try {
      const result = await instance_no_auth.delete(`/categories/${id}`);
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

export const get_all_property = createAsyncThunk(
  "category/get_all_property",
  async ({ id }: { id: string }, { rejectWithValue }) => {
    try {
      const result = await instance_no_auth.post(`/properties/${id}`);
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

export const get_one_property = createAsyncThunk(
  "category/get_one_property",
  async ({ id }: { id: string }, { rejectWithValue }) => {
    try {
      const result = await instance_no_auth.get(`/properties/${id}`);
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

export const create_property = createAsyncThunk(
  "category/create_property",
  async (
    {
      data,
    }: {
      data: {
        title: string;
        type: string;
        body: string[];
        category: string | string[] | undefined;
      };
    },
    { rejectWithValue }
  ) => {
    try {
      const [res1, res2] = await Promise.all([
        await instance_no_auth.post(`/properties/`, data),
        await instance_no_auth.post(`/properties/${data.category}`),
      ]);
      return { respons: res1, data: res2.data };
    } catch (err) {
      const error = err as AxiosError;
      const responseData = error.response?.data as ApiResponse;
      return rejectWithValue({
        message: responseData.message,
        err,
      });
    }
  }
);

export const update_property = createAsyncThunk(
  "category/update_property",
  async (
    {
      id,
      last_data,
    }: { id: string; last_data: { title: string; body: string[] } },
    { rejectWithValue }
  ) => {
    try {
      const result = await instance_no_auth.put(`/properties/${id}`, last_data);
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
export const delete_property = createAsyncThunk(
  "category/delete_property",
  async ({ id }: { id: string }, { rejectWithValue }) => {
    try {
      const result = await instance_no_auth.delete(`/properties/${id}`);
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
