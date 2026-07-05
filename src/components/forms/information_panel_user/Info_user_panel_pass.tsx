"use client"

import React, { useId, useState } from 'react'
import Input from '@/components/input/Input';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import Loading from "./../../../components/loading/Loading";
import { set_method_email, setBoolean } from '@/redux/userSlice/userSlice';
import { change_password_whit_email_getCode, change_password_with_password } from '@/redux/userSlice/action';
import toast from 'react-hot-toast';
import Timer from '@/components/timer/Timer';
import { useRouter } from 'next/navigation';

interface ApiResponse {
    message: string,
    is_new?: boolean,
    captcha?: boolean
}

function Info_user_panel_pass() {
    const dispatch = useAppDispatch();
    const router = useRouter()
    const is_sendEmail = useAppSelector((state) => state.userSlice.is_sendEmail)
    const [password_by, setPassword_by] = useState("password")
    const loading_email_code = useAppSelector((state) => state.userSlice.loading_email_code)
    const [data, setData] = useState({
        password: "",
        new_password: "",
        code_Email: ""
    });

    const unID = {
        passwordInput: useId(),
        new_passwordInput: useId(),
        code_EmailInput: useId(),
        emailInput: useId(),
    };
    const dataChanger = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData((state) => ({
            ...state,
            [name]: value,
        }));
    };
    const setIs_sendEmail = (data: boolean) => {
        dispatch(setBoolean(data))
    }
    const getCodeEmail = async () => {
        dispatch(set_method_email("get"))
        if (password_by === "email") {
            try {
                const result = await dispatch(change_password_whit_email_getCode({ action: "get" })) as { payload: ApiResponse }
                if (change_password_whit_email_getCode.fulfilled.match(result)) {
                    toast.success(result?.payload?.message)
                    setIs_sendEmail(true)
                } else {
                    if (change_password_whit_email_getCode.rejected.match(result)) {
                        toast.error(result?.payload?.message)
                    }
                }
            } catch (err) {
                console.error(err);
            }
        }
    }

    const validate_email = () => {
        if (!data.code_Email) {
            toast.error("کد ارسال شده را وارد کنید")
        } else if (data.code_Email.length !== 5) {
            toast.error("کد ارسال شده باید 5 رقم باشد")
        } else if (!data.new_password) {
            toast.error("گذرواژه جدید خود را وارد کنید")
        }
        else if (data.new_password.length < 8) {
            toast.error("گذرواژه باید 8 کاراکتر باشد")
        }
        else {
            const value = {
                email_code: data.code_Email,
                password: data.new_password
            }
            handler_change_password_whit_email_getCode(value)
        }
    }

    const handler_change_password_whit_email_getCode = async (value: { email_code: string, password: string }) => {
        dispatch(set_method_email("verify"))
        if (password_by === "email") {
            try {
                const result = await dispatch(change_password_whit_email_getCode({ action: "verify", data: value })) as { payload: ApiResponse }
                if (change_password_whit_email_getCode.fulfilled.match(result)) {
                    toast.success(result?.payload?.message)
                    router.replace("/user_panel/user_information")
                } else {
                    if (change_password_whit_email_getCode.rejected.match(result)) {
                        toast.error(result?.payload?.message)
                    }
                }
            } catch (err) {
                console.error(err);
            }
        }
    }

    const validate_password = () => {
        if (!data.password) {
            toast.error("لطفا گذرواژه فعلی خود را وارد کنید")
        } else if (!data.new_password && data.new_password.length < 7) {
            toast.error("گذرواژه باید دارای 8 رقم باشد")
        } else {
            const value = {
                password: data.new_password,
                prev_password: data.password,
            }
            handler_change_password_whit_password(value)
        }
    }

    const handler_change_password_whit_password = async (value: { password: string, prev_password: string }) => {
        if (password_by === "password") {
            try {
                const result = await dispatch(change_password_with_password(value)) as { payload: ApiResponse }
                if (change_password_with_password.fulfilled.match(result)) {
                    toast.success(result?.payload?.message)
                    router.replace("/user_panel/user_information")
                } else {
                    if (change_password_with_password.rejected.match(result)) {
                        toast.error(result?.payload?.message)
                    }
                }
            } catch (err) {
                console.error(err);
            }
        }
    }

    return (
        <>{
            password_by === "password" ?
                <div className='w-full flex flex-row justify-center items-center gap-5'>
                    <form onSubmit={(e)=>{e.preventDefault()}} className='w-full flex flex-col justify-center items-center'>
                        <div className='w-full grid gap-6 mb-6 lg:grid-cols-2'>
                            <div className="w-full flex flex-col justify-start items-center mb-3">
                                <Input placeholder="" align_text={"start"} disabled={false} id={unID.passwordInput} setValue={dataChanger} title={"گذرواژه فعلی"} name="password" value={data.password} />
                            </div>
                            <div className="w-full flex flex-col justify-start items-center mb-3">
                                <Input placeholder="" align_text={"start"} disabled={false} id={unID.new_passwordInput} setValue={dataChanger} title={"گذرواژه جدید"} name="new_password" value={data.new_password} />
                            </div>
                        </div>
                        <div className='flex flex-col justify-around items-center w-full gap-2'>
                            <button onClick={validate_password} className='py-2 px-3 rounded-md bg-colorTheme w-full mx-auto text-white'>ویرایش گذرواژه</button>
                            <div className='flex justify-center items-center mt-2 gap-5'>
                                <button onClick={() => {
                                    setPassword_by("email")
                                }} className='text-[#bbb] text-sm'>ویرایش گذرواژه با ایمیل</button>
                            </div>
                        </div>
                    </form>
                </div> :
                <>
                    <div className='w-full grid gap-6 mb-2 lg:grid-cols-2'>
                        <div className="w-full flex flex-col justify-start items-center mb-3">
                            <Input placeholder="12345" align_text={"center"} disabled={false} id={unID.code_EmailInput} setValue={dataChanger} title={"کد تایید"} name="code_Email" value={data.code_Email} />
                        </div>
                        <div className="w-full flex flex-col justify-start items-center mb-3">
                            <Input placeholder="" align_text={"center"} disabled={false} id={unID.new_passwordInput} setValue={dataChanger} title={"گذرواژه جدید"} name="new_password" value={data.new_password} />
                        </div>
                    </div>
                    <p className='py-4'>کد به صورت خودکار به ایمیل ثبت شده ارسال میشود</p>
                    {

                        loading_email_code === true ?
                            <Loading /> : is_sendEmail === false ?
                                <button onClick={getCodeEmail} className="w-full bg-colorTheme rounded-md py-2 px-3 font-bold text-white ">دریافت کد</button>
                                : <p className="cursor-pointer text-[#666]"><Timer handler={() => {
                                    setIs_sendEmail(false)
                                }} time_value={120} /> دیگر امتحان کنید</p>
                    }
                    <button onClick={validate_email} className="w-full bg-colorTheme rounded-md py-2 px-3 font-bold text-white mt-2">ویرایش گذرواژه</button>
                    <div className='flex justify-center items-center mt-2 gap-5'>
                        <button onClick={() => {
                            setPassword_by("password")
                        }} className='text-[#bbb] text-sm'>ویرایش گذرواژه با گذرواژه قبلی</button>
                    </div>
                </>
        }
        </>
    )
}

export default Info_user_panel_pass