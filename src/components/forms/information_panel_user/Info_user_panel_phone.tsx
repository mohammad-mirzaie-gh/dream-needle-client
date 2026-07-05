"use client"

import Input from '@/components/input/Input'
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { change_phone } from '@/redux/userSlice/action';
import { set_method_email, setBoolean } from '@/redux/userSlice/userSlice';
import { useRouter } from 'next/navigation';
import React, { useId, useState } from 'react'
import toast from 'react-hot-toast';
import Loading from "./../../../components/loading/Loading";
import Timer from '@/components/timer/Timer';
import { numberFormater } from "./../../../utils/formats/regExe";
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
        phone: "",
        code_phone: ""
    });

    const unID = {
        phoneInput: useId(),
        code_phoneInput: useId(),
    };

    const setIs_sendEmail = (data: boolean) => {
        dispatch(setBoolean(data))
    }

    const get_email = () => {
        if (numberFormater.test(data.phone) === false) {
            toast.error("لطفا آدرس ایمیل معتبر وارد کنید")
        } else {
            const value = {
                phone: data.phone,
            }
            getCodePhone(value)
        }
    }

    const getCodePhone = async (value: { phone: string }) => {
        dispatch(set_method_email("get"))
        try {
            const result = await dispatch(change_phone({ action: "get", data: value })) as { payload: ApiResponse }
            if (change_phone.fulfilled.match(result)) {
                toast.success(result?.payload?.message)
                setIs_sendEmail(true)
            } else {
                if (change_phone.rejected.match(result)) {
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
        if (numberFormater.test(data.phone) === false) {
            toast.error("لطفا آدرس ایمیل معتبر وارد کنید")
        } else if (data.code_phone.length !== 5) {
            toast.error("کد تایید شما باید 5 رقم باشد")
        } else {
            const value = {
                phone: data.phone,
                code: data.code_phone,
            }
            handler_change_email(value)
        }
    }

    const handler_change_email = async (value: {
        phone: string,
        code: string,
    }) => {
        dispatch(set_method_email("verify"))
        try {
            const result = await dispatch(change_phone({ action: "verify", data: value })) as { payload: ApiResponse }
            if (change_phone.fulfilled.match(result)) {
                toast.success(result?.payload?.message)
                router.replace("/user_panel/user_information")
            } else {
                if (change_phone.rejected.match(result)) {
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
                    <Input placeholder="" align_text={"start"} disabled={false} id={unID.phoneInput} setValue={dataChanger} title={"شماره تلفن"} name="phone" value={data.phone} />
                </div>
                <div className="w-full flex flex-col justify-start items-center mb-3">
                    <Input placeholder="" align_text={"start"} disabled={false} id={unID.code_phoneInput} setValue={dataChanger} title={"کد تایید"} name="code_phone" value={data.code_phone} />
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
                <button onClick={validate_email} className='py-2 px-3 rounded-md bg-colorTheme w-full mx-auto text-white'>ویرایش شماره تلفن</button>
            </div>
        </form>
    )
}

export default Info_user_panel_email