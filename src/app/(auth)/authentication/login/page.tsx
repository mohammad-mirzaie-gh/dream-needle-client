import Image from 'next/image'
import React from 'react'
import logo from "../../../../../public/image/logo/logo.webp";
import FormLogin from '@/components/forms/formLogin/FormLoginWithPassword';

function page() {
  return (
    <div className='bg-backgroundColorTheme_1 text-textColorTheme w-full min-h-[100dvh] flex flex-col justify-center items-center gap-5'>
      <Image src={logo} alt='نماد وب سایت رویای سوزن' height={100}/>
      <FormLogin>
        <h1 className='text-center text-2xl font-bold text-colorTheme my-3 mb-6'>ورود</h1>
      </FormLogin>
    </div>
  )
}

export default page