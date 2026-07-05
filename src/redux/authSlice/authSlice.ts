import { createSlice } from "@reduxjs/toolkit";
import { getCaptcha, postCaptcha, loginWhitPassword, login_whit_phone_validateCode, login_whit_phone_sendCode } from "./action";
interface state {
    phone: string,
    email: string,
    src_captcha: string | boolean
    is_sendEmail: boolean
    loading_email_code: boolean
}

const initialState: state = {
    phone: "",
    email: "",
    src_captcha: false,
    is_sendEmail: false,
    loading_email_code: false
}

const auth = createSlice({
    name: "auth",
    initialState,
    reducers: {
        phoneNumberSaver: (state, action) => {
            state.phone = action.payload
        },
        phoneEmailSaver: (state, action) => {
            state.email = action.payload
        },
        setBoolean(state, action) {
            state.is_sendEmail = action.payload
        }
    },
    extraReducers: (build) => {
        build
            .addCase(getCaptcha.fulfilled, (state, action) => {
                state.src_captcha = action.payload.src
            })
            .addCase(getCaptcha.rejected, (_, action) => {
            })
            .addCase(postCaptcha.fulfilled, (_, action) => {
            })
            .addCase(postCaptcha.rejected, (_, action) => {
            })
            .addCase(loginWhitPassword.fulfilled, (_, action) => {
            })
            .addCase(loginWhitPassword.rejected, (_, action) => {
            })
            .addCase(login_whit_phone_sendCode.pending, (state) => {
                state.loading_email_code = true
            })
            .addCase(login_whit_phone_sendCode.fulfilled, (state, action) => {
                state.loading_email_code = false
            })
            .addCase(login_whit_phone_sendCode.rejected, (state, action) => {
                state.loading_email_code = false
            })
            .addCase(login_whit_phone_validateCode.pending, (state) => {
                state.loading_email_code = true
            })
            .addCase(login_whit_phone_validateCode.fulfilled, (state, action) => {
                state.loading_email_code = false
            })
            .addCase(login_whit_phone_validateCode.rejected, (state, action) => {
                state.loading_email_code = false
            })

    }
})

export default auth.reducer
export const { phoneNumberSaver, setBoolean, phoneEmailSaver } = auth.actions