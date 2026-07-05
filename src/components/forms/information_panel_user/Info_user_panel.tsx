"use client"

import React, { useId, useState } from 'react'
import Input from '@/components/input/Input';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { change_info } from "@/redux/userSlice/action";
import { useRouter } from 'next/navigation';

interface ApiResponse {
    message: string,
    is_new?: boolean,
}

function Info_user_panel() {
    const dispatch = useAppDispatch();
    const router = useRouter()
    const user = useAppSelector((state) => state.userSlice.user)
    const [data, setData] = useState({
        name: user?.name || "",
        lastname: user?.lastname || "",
        phone: user?.phone || "",
        email: user?.email || "",
        address: ""
    });
    const unID = {
        inputName: useId(),
        inputLastname: useId(),
        inputPhone: useId(),
        inputEmail: useId(),
        inputAddress: useId(),
    };
    const dataChanger = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData((state) => ({
            ...state,
            [name]: value,
        }));
    };

    const validate_information_1_user = () => {
        if (!data.name && data.name.length <= 2) {
            toast.error("لطفا یک نام معتبر وارد کنید")
        } else if (!data.lastname && data.lastname.length <= 2) {
            toast.error("لطفا یک نام خانوادگی معتبر وارد کنید")
        } else if (!data.address && data.address.length <= 10) {
            toast.error("لطفا یک آدرس سکونت معتبر وارد کنید")
        } else {
            const value = {
                name: data.name,
                lastname: data.lastname,
                address: data.address,
            }
            change_handler_information_user(value)
        }
    }


    const change_handler_information_user = async (value: {
        name: string
        lastname: string
        address: string
    }) => {
        try {
            const result = await dispatch(change_info( value )) as { payload: ApiResponse }
            if (change_info.fulfilled.match(result)) {
                toast.success(result?.payload?.message)
                router.replace("/user_panel/user_information")
            } else {
                if (change_info.rejected.match(result)) {
                    toast.error(result?.payload?.message)
                }
            }
        } catch (err) {
            console.error(err);
        }
    }


    return (
        <>
            <div className='w-full flex flex-row justify-center items-center gap-5'>
                <form onSubmit={(e) => { e.preventDefault() }} className='w-full flex flex-col justify-center items-center'>
                    <div className='w-full grid gap-6 mb-6 lg:grid-cols-2'>
                        <div className="w-full flex flex-col justify-start items-center mb-3">
                            <Input placeholder="" align_text={"start"} disabled={false} id={unID.inputName} setValue={dataChanger} title={"نام"} name="name" value={data.name} />
                        </div>
                        <div className="w-full flex flex-col justify-start items-center mb-3">
                            <Input placeholder="" align_text={"start"} disabled={false} id={unID.inputLastname} setValue={dataChanger} title={"نام خانوادگی"} name="lastname" value={data.lastname} />
                        </div>
                        <div className="w-full flex flex-col justify-start items-center mb-3">
                            <Input placeholder="" align_text={"end"} disabled={true} id={unID.inputEmail} setValue={dataChanger} title={"آدرس ایمیل"} name="email" value={data.email} />
                        </div>
                        <div className="w-full flex flex-col justify-start items-center mb-3">
                            <Input placeholder="" align_text={"end"} disabled={true} id={unID.inputPhone} setValue={dataChanger} title={"شماره تلفن"} name="phone" value={data.phone} />
                        </div>
                    </div>
                    <div className='flex flex-col justify-around items-center w-full gap-2 mt-5'>
                        <button onClick={validate_information_1_user} className='py-2 px-3 rounded-md bg-colorTheme w-full mx-auto'>ویرایش اطلاعات</button>
                        <div className='flex justify-center items-center mt-2 gap-5'>
                            <Link href={"/user_panel/user_information/change_password_user"} className='text-[#bbb] text-sm'>ویرایش گذرواژه</Link>
                            <span>|</span>
                            <Link href={"/user_panel/user_information/change_email_user"} className='text-[#bbb] text-sm'>ویرایش آدرس ایمیل</Link>
                            <span>|</span>
                            <Link href={"/user_panel/user_information/change_phone_user"} className='text-[#bbb] text-sm'>ویرایش شماره موبایل</Link>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Info_user_panel