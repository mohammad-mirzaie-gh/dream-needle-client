import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance_no_auth } from "./../../configs/axios_config";
import { AxiosError } from "axios";

interface ApiResponse {
    message: string,
    is_new?: boolean,
}

export const get_is_login = createAsyncThunk("users/get_is_login", async (_, { rejectWithValue }) => {
    try {
        const result = await instance_no_auth.get("/users/is_login")
        return result.data
    } catch (err) {
        const error = err as AxiosError;
        const responseData = error.response?.data as ApiResponse;
        return rejectWithValue({
            message: responseData.message,
        });
    }
})
export const log_out = createAsyncThunk("users/log_out", async (_, { rejectWithValue }) => {
    try {
        const result = await instance_no_auth.get("/users/logout")
        return result.data
    } catch (err) {
        const error = err as AxiosError;
        const responseData = error.response?.data as ApiResponse;
        return rejectWithValue({
            message: responseData.message,
        });
    }
})
export const change_password_whit_email_getCode = createAsyncThunk("user/change_password_whit_email_getCode", async (obj: { action: "get" | "verify", data?: { email_code: string, password: string } }, { rejectWithValue }) => {
    try {
        const result = await instance_no_auth.post(`/users/change_password_with_email/${obj.action}`, obj.data)
        return result.data
    } catch (err) {
        const error = err as AxiosError;
        const responseData = error.response?.data as ApiResponse;
        return rejectWithValue({
            message: responseData.message,
        });
    }
})
export const change_password_with_password = createAsyncThunk("user/change_password_with_password", async (obj: { password: string, prev_password: string }, { rejectWithValue }) => {
    try {
        const result = await instance_no_auth.post(`/users/change_password_with_password`, obj)
        return result.data
    } catch (err) {
        const error = err as AxiosError;
        const responseData = error.response?.data as ApiResponse;
        return rejectWithValue({
            message: responseData.message,
        });
    }
})
export const change_email = createAsyncThunk("user/change_email", async (obj: { action: "get" | "verify", data?: { email: string, code_Email?: string } }, { rejectWithValue }) => {
    try {
        const result = await instance_no_auth.post(`/users/change_email/${obj.action}`, obj.data)
        return result.data
    } catch (err) {
        const error = err as AxiosError;
        const responseData = error.response?.data as ApiResponse;
        return rejectWithValue({
            message: responseData.message,
        });
    }
})
export const change_phone = createAsyncThunk("user/change_phone", async (obj: { action: "get" | "verify", data?: { phone: string, code?: string } }, { rejectWithValue }) => {
    try {
        const result = await instance_no_auth.post(`/users/change_phone/${obj.action}`, obj.data)
        return result.data
    } catch (err) {
        const error = err as AxiosError;
        const responseData = error.response?.data as ApiResponse;
        return rejectWithValue({
            message: responseData.message,
        });
    }
})
export const change_info = createAsyncThunk("user/change_info", async (data: {
    name: string
    lastname: string
    address: string
}, { rejectWithValue }) => {
    try {
        const result = await instance_no_auth.post(`/users/change_user_information`, data)
        return result.data
    } catch (err) {
        const error = err as AxiosError;
        const responseData = error.response?.data as ApiResponse;
        return rejectWithValue({
            message: responseData.message,
        });
    }
})

export const get_all_user = createAsyncThunk("user/get_all_user", async ({ page, search_phone }: { page?: string, search_phone: string }, { rejectWithValue }) => {
    try {
        const result = await instance_no_auth.get(`/users?page=${page}&search_phone=${search_phone}`)
        return result.data
    } catch (err) {
        const error = err as AxiosError;
        const responseData = error.response?.data as ApiResponse;
        return rejectWithValue({
            message: responseData.message,
        });
    }
})

export const get_one_user = createAsyncThunk("user/get_one_user", async ({ id }: { id: string }, { rejectWithValue }) => {
    try {
        const result = await instance_no_auth.get(`/users/${id}`)
        return result.data
    } catch (err) {
        const error = err as AxiosError;
        const responseData = error.response?.data as ApiResponse;
        return rejectWithValue({
            message: responseData.message,
        });
    }
})
export const edit_user_management_user = createAsyncThunk("user/edit_user_management_user", async ({ id, data }: { id: string, data: { name: string, lastname: string } }, { rejectWithValue }) => {
    try {
        const result = await instance_no_auth.put(`/users/${id}`, data)
        return result.data
    } catch (err) {
        const error = err as AxiosError;
        const responseData = error.response?.data as ApiResponse;
        return rejectWithValue({
            message: responseData.message,
        });
    }
})
