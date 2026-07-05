"use client"

import Input from '@/components/input/Input'
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { change_email } from '@/redux/userSlice/action';
import { set_method_email, setBoolean } from '@/redux/userSlice/userSlice';
import { useRouter } from 'next/navigation';
import React, { useId, useState } from 'react'
import toast from 'react-hot-toast';
import Loading from "./../../../components/loading/Loading";
import Timer from '@/components/timer/Timer';
import { emailFormater } from "./../../../utils/formats/regExe";
interface ApiResponse {
    message: string,
    is_new?: boolean,
}

function Info_user_panel_email() {
    const dispatch = useAppDispatch();
    const router = useRouter()
    const is_sendEmail = useAppSelector((state) => state.userSlice.is_sendEmail)
    const loading_email_code = useAppSelector((state) => state.userSlice.loading_email_code)

    const [data, setData] = useState({
        email: "",
        code_Email: ""
    });

    const unID = {
        emailInput: useId(),
        code_emailInput: useId(),
    };

    const setIs_sendEmail = (data: boolean) => {
        dispatch(setBoolean(data))
    }

    const get_email = () => {
        if (emailFormater.test(data.email) === false) {
            toast.error("لطفا آدرس ایمیل معتبر وارد کنید")
        } else {
            const value = {
                email: data.email,
            }
            getCodeEmail(value)
        }
    }

    const getCodeEmail = async (value: { email: string }) => {
        dispatch(set_method_email("get"))
        try {
            const result = await dispatch(change_email({ action: "get", data: value })) as { payload: ApiResponse }
            if (change_email.fulfilled.match(result)) {
                toast.success(result?.payload?.message)
                setIs_sendEmail(true)
            } else {
                if (change_email.rejected.match(result)) {
                    toast.error(result?.payload?.message)
                }
            }
        } catch (err) {
            console.error(err);
        }
    }

    const dataChanger = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData((state) => ({
            ...state,
            [name]: value,
        }));
    };

    const validate_email = () => {
        if (emailFormater.test(data.email) === false) {
            toast.error("لطفا آدرس ایمیل معتبر وارد کنید")
        } else if (data.code_Email.length !== 5) {
            toast.error("کد تایید شما باید 5 رقم باشد")
        } else {
            const value = {
                email: data.email,
                code_Email: data.code_Email,
            }
            handler_change_email(value)
        }
    }

    const handler_change_email = async (value: {
        email: string,
        code_Email: string,
    }) => {
        dispatch(set_method_email("verify"))
        try {
            const result = await dispatch(change_email({ action: "verify", data: value })) as { payload: ApiResponse }
            if (change_email.fulfilled.match(result)) {
                toast.success(result?.payload?.message)
                router.replace("/user_panel/user_information")
            } else {
                if (change_email.rejected.match(result)) {
                    toast.error(result?.payload?.message)
                }
            }
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <form onSubmit={(e) => { e.preventDefault() }} className='w-full flex flex-col justify-center items-center'>
            <div className='w-full grid gap-6 mb-6 lg:grid-cols-2'>
                <div className="w-full flex flex-col justify-start items-center mb-3">
                    <Input placeholder="" align_text={"start"} disabled={false} id={unID.emailInput} setValue={dataChanger} title={"آدرس ایمیل"} name="email" value={data.email} />
                </div>
                <div className="w-full flex flex-col justify-start items-center mb-3">
                    <Input placeholder="" align_text={"start"} disabled={false} id={unID.code_emailInput} setValue={dataChanger} title={"کد تایید"} name="code_Email" value={data.code_Email} />
                </div>
            </div>
            <div className='w-full mb-4'>
                {
                    loading_email_code === true ?
                        <Loading /> : is_sendEmail === false ?
                            <button onClick={get_email} className="w-full bg-colorTheme rounded-md py-2 px-3 font-bold text-white ">دریافت کد</button>
                            : <p className="cursor-pointer text-[#666]"><Timer handler={() => {
                                setIs_sendEmail(false)
                            }} time_value={120} /> دیگر امتحان کنید</p>
                }
            </div>
            <div className='flex flex-col justify-around items-center w-full gap-2'>
                <button onClick={validate_email} className='py-2 px-3 rounded-md bg-colorTheme w-full mx-auto text-white'>ویرایش آدرس ایمیل</button>
            </div>
        </form>
    )
}

export default Info_user_panel_email