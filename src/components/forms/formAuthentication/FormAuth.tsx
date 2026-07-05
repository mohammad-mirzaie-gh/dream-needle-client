"use client";

import { getCaptcha, postCaptcha } from "@/redux/authSlice/action";
import { phoneNumberSaver } from "@/redux/authSlice/authSlice";
import React, { useEffect, useId, useRef, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../../redux/store";
import { numberFormater } from "./../../../utils/formats/regExe";
import Loading from "./../../../components/loading/Loading";
import Input from "@/components/input/Input";
import toast from "react-hot-toast";
import { FiRefreshCcw } from "react-icons/fi";
import { useRouter } from "next/navigation";

interface ApiResponse {
    message: string,
    is_new?: boolean
}


function FormAuth({ children }: { children: React.ReactNode }) {
    const router = useRouter()
    const dispatch = useAppDispatch();
    const [data, setData] = useState({
        phone: "",
    });
    useEffect(() => {
        dispatch(getCaptcha())
    }, [dispatch])

    const code_captcha = useRef<HTMLInputElement>(null)
    const src_captcha = useAppSelector((state) => state.authSlice.src_captcha);


    const unID = {
        inputPhone: useId(),
    };

    const dataChanger = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData((state) => ({
            ...state,
            [name]: value,
        }));
    };

    useEffect(() => {
    }, [data])

    const sendNewData = async () => {

        if (!data.phone) {
            toast.error("لطفا شماره تلفن را وارد کنید")
        } else if (numberFormater.test(data.phone) === false) {
            toast.error("لطفا شماره تلفن معتبر وارد کنید")
        } else if (!code_captcha.current || !code_captcha.current.value) {
            toast.error("لطفا کد امنیتی را وارد کنید");
        } else if (code_captcha.current.value.length !== 4) {
            toast.error("کد امنیتی باید چهار رقم باشد")
        } else {
            const obj: { phone: string, valueCode: string } = {
                phone: data.phone,
                valueCode: code_captcha.current.value
            }
            try {
                const result = await dispatch(postCaptcha(obj)) as { payload: ApiResponse }
                if (postCaptcha.fulfilled.match(result)) {
                    toast.success(result.payload.message)
                    if (result.payload.is_new) {
                        router.replace("/authentication/register")
                    } else {
                        router.replace("/authentication/login")
                    }
                    dispatch(phoneNumberSaver(data.phone))
                } else {
                    toast.error(result?.payload?.message)
                }
            } catch (err) {
                console.error(err);
            }

        }
    }

    const reGenerateCaptcha = () => {
        dispatch(getCaptcha())
    }

    return (
        <form onSubmit={(e) => e.preventDefault()} className="sm:w-[400px] xs:w-[350px] w-[300px] p-5 flex flex-col justify-start items-center gap-3 shadow-boxing rounded-md">
            {children}
            <div className="w-full flex flex-col justify-end items-center mb-3">
                <Input placeholder="09358485656" align_text={"end"} disabled={false} id={unID.inputPhone} setValue={dataChanger} title={"شماره تلفن"} name="phone" value={data.phone} />
            </div>
            <div className="w-full flex flex-row-reverse justify-between items-center gap-2">
                {!src_captcha ? (
                    <Loading/>
                ) : (
                    <div className="relative h-[45px] w-[45%] max-xs:w-full min-w-[100px]">
                        <img className="h-[45px] w-full rounded-lg " src={src_captcha as string} alt="" />
                        <div onClick={reGenerateCaptcha} className="absolute cursor-pointer bottom-[-12px] shadow-md right-[-12px] bg-white rounded-[50%] p-1"><FiRefreshCcw color="black" /></div>
                    </div>
                )}
                <input ref={code_captcha} className="text-center bg-backgroundColorTheme_1 font-bold shadow-inputing py-[10px] px-3 rounded-lg w-full" placeholder="کد امنیتی" type="text" name="" id="" />
            </div>
            <button onClick={sendNewData} onSubmit={sendNewData} type="submit" className="w-full bg-colorTheme rounded-md py-2 px-3 font-bold text-white mt-8">ارسال کد</button>
        </form>
    );
}

export default FormAuth;
