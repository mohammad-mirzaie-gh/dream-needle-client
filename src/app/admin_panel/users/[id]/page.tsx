"use client"
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { edit_user_management_user, get_one_user } from '@/redux/userSlice/action'
import React, { useEffect, useId, useState } from 'react'
import Counter_admin_panel from "../../../../components/container/Container_user_panel";
import Title_panel_user from "../../../../components/title/Title_panel_user";
import Loading from "../../../../components/loading/Loading";
import { useParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Input from '@/components/input/Input';


function Page() {

    const user = useAppSelector((state) => state.userSlice.information_user)
    const admin = useAppSelector((state) => state.userSlice.user)
    const [data, setData] = useState({
        name: "",
        lastname: "",
        phone: "",
        email: "",
    });

    const dispatch = useAppDispatch()
    const params = useParams().id
    const route = useRouter()
    useEffect(() => {
        if (typeof params === "string") {
            dispatch(get_one_user({ id: params }))
        } else {
            toast.error("خطای داخلی")
            route.push("/admin_panel/users")
        }
    }, [])
    useEffect(() => {
        if (typeof user === "object") {
            setData({
                name: user?.name || "",
                lastname: user?.lastname || "",
                phone: user?.phone || "",
                email: user?.email || ""
            })
        }
    }, [user])

    interface ApiResponse {
        message: string,
    }
    const dataChanger = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData((state) => ({
            ...state,
            [name]: value,
        }));
    };

    const unID = {
        inputName: useId(),
        inputLastname: useId(),
        inputPhone: useId(),
        inputEmail: useId(),
        inputAddress: useId(),
    };

    const edit_user_handler = async () => {

        try {
            if (admin?.role === 1 || admin?.role === 0) {
                if (typeof params === "string") {
                    if (data.name && data.lastname) {

                        const result = await dispatch(edit_user_management_user({ id: params, data: { name: data.name, lastname: data.lastname } })) as { payload: ApiResponse }
                        if (edit_user_management_user.fulfilled.match(result)) {
                            toast.success("با موفقیت به روزرسانی شد")
                            route.push("/admin_panel/users")
                        } else {
                            toast.error(result.payload.message)
                        }
                    } else {
                        toast.error("لطفا مقدار معتبر برای نام و نام خانوادگی بگزارید")
                    }
                } else {
                    toast.error("خطای داخلی")
                    route.push("/admin_panel/users")
                }
            } else {
                toast.error("شما اجازه دست رسی به این بخش را ندارید")
            }
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <section className='w-full py-5 lg:px-10 px-6'>
            <Title_panel_user title='اطلاعات کاربر' />
            <Counter_admin_panel >
                {
                    user === "loading" ?
                        <div className='flex flex-row justify-center items-center'>
                            <Loading />
                        </div>
                        :
                        <>
                            <div className='flex flex-col justify-center'>
                                <p className='p-3'>سطح دست رسی کاربر : {user?.role == 1 ? <span className='text-purple-500'>ادمین مدیریتی</span> : user?.role == 2 ? "ادمین عادی" : "کاربر عادی"}</p>
                                <p className='p-3'>تایید ایمیل توسط کاربر : {user?.email_verify === false ? <span className='text-rose-500'>تایید نشده</span> : <span className='text-green-500'>تایید شده توسط کاربر</span>}</p>
                                <p className='p-3'> تایید شماره تلفن توسط کاربر : {user?.phone_verify === false ? <span className='text-rose-500'>تایید نشده</span> : <span className='text-green-500'>تایید شده توسط کاربر</span>}</p>
                            </div>
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
                            </form>
                            <button onClick={edit_user_handler} className='py-2 px-3 w-full rounded-md bg-colorTheme mt-5 text-white'>ذخیره اطلاعات توسط ادمین</button>
                        </>
                }
            </Counter_admin_panel>
        </section>
    )
}

export default Page