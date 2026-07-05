import FormRegister from '@/components/forms/formRegister/FormRegister'
import Image from 'next/image'
import React from 'react'
import logo from "../../../../../public/image/logo/logo.webp";

function page() {
  return (
    <div className='bg-backgroundColorTheme_1 text-textColorTheme w-full min-h-[100dvh] flex flex-col justify-center items-center gap-5 pb-10'>
      <Image src={logo} alt='نماد وب سایت رویای سوزن' height={100}/>
      <FormRegister>
        <h1 className='text-center text-2xl font-bold text-colorTheme my-3 mb-6'>ثبت نام</h1>
      </FormRegister>
    </div>
  )
}

export default page