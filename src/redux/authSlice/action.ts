import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance_no_auth } from "./../../configs/axios_config";
import { AxiosError } from "axios";

interface ApiResponse {
    message: string,
    is_new? : boolean,
    captcha? : boolean
}

export const getCaptcha = createAsyncThunk("auth/getCaptcha" , async( _ , {rejectWithValue})=>{
    try {
        const result = await instance_no_auth.get("/auth/captcha")
        return result.data
    } catch (err) {
        return rejectWithValue({
            message : err
        })
    }
})
export const postCaptcha = createAsyncThunk("auth/postCaptcha" , async(obj : { phone: string, valueCode: string } , {rejectWithValue})=>{
    try {
        const result = await instance_no_auth.post("/auth/captcha" , obj , {withCredentials : true})
        return result.data
    } catch (err) {
        const error = err as AxiosError; 
        const responseData = error.response?.data as ApiResponse;  
        return rejectWithValue({  
            message: responseData.message,  
        }); 
    }
})

export const loginWhitPassword = createAsyncThunk("auth/loginWhitPassword" , async(obj : { phone? : string , password? : string } , {rejectWithValue})=>{
    try {
        const result = await instance_no_auth.post("/auth/login_with_password" , obj , {withCredentials : true})
        return result.data
    } catch (err) {
        const error = err as AxiosError; 
        const responseData = error.response?.data as ApiResponse;  
        return rejectWithValue({  
            message: responseData.message,  
            captcha: responseData.captcha
        }); 
    }
})
export const login_whit_phone_sendCode = createAsyncThunk("auth/loginWhitEmail_getCode" , async(_,{rejectWithValue})=>{
    try {
        const result = await instance_no_auth.get("/auth/login_with_phone")
        return result.data
    } catch (err) {
        const error = err as AxiosError; 
        const responseData = error.response?.data as ApiResponse;  
        return rejectWithValue({  
            message: responseData.message,  
            captcha: responseData.captcha
        }); 
    }
})
export const login_whit_phone_validateCode = createAsyncThunk("auth/loginWhitEmail_sendCode" , async(obj : { phone?: string, password?: string , code_Email? :string} , {rejectWithValue})=>{
    try {
        const result = await instance_no_auth.post("/auth/login_with_phone" , obj , {withCredentials : true})
        return result.data
    } catch (err) {
        const error = err as AxiosError; 
        const responseData = error.response?.data as ApiResponse;  
        return rejectWithValue({  
            message: responseData.message,  
            captcha: responseData.captcha
        }); 
    }
})
export const register_sendCode_phone = createAsyncThunk("auth/register_sendCode_phone" , async(obj : { phone: string } , {rejectWithValue})=>{
    try {
        const result = await instance_no_auth.post("/auth/register_sendCode_phone" , obj , {withCredentials : true})
        return result.data
    } catch (err) {
        const error = err as AxiosError; 
        const responseData = error.response?.data as ApiResponse;  
        return rejectWithValue({  
            message: responseData.message,  
            captcha: responseData.captcha
        }); 
    }
})
export const register_phone = createAsyncThunk("auth/register_phone" , async(obj : { name: string, lastname: string, email: string, phone: string, password: string, code: string } , {rejectWithValue})=>{
    try {
        const result = await instance_no_auth.post("/auth/register_phone" , obj , {withCredentials : true})
        return result.data
    } catch (err) {
        const error = err as AxiosError; 
        const responseData = error.response?.data as ApiResponse;  
        return rejectWithValue({  
            message: responseData.message,  
            captcha: responseData.captcha
        }); 
    }
})