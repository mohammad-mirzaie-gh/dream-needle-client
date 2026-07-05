import Image from 'next/image'
import React from 'react'
import logo from "./../../../../public/image/logo/logo.webp";
import FormAuth from "./../../../components/forms/formAuthentication/FormAuth";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: "authentication",
    template: ""
  },
  description: "این صفحه برای ورود کاربر و دیدن اطلاعات خودش در وب سایت طراحی شده",
};

function page() {
  return (
    <div className='bg-backgroundColorTheme_1 text-textColorTheme w-full min-h-[100dvh] flex flex-col justify-center items-center gap-5'>
      <Image src={logo} alt='نماد وب سایت رویای سوزن' height={100}/>
      <FormAuth>
        <h1 className='text-center text-2xl font-bold text-colorTheme my-3 mb-6'>احراز هویت</h1>
      </FormAuth>
    </div>
  )
}

export default page
