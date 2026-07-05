import Image from 'next/image'
import React from 'react'
import notFound from "./../../public/image/not-found/not-found.svg";
import Link from 'next/link';
function NotFound() {
  return (
    <div className='w-full min-h-[100dvh] py-5 px-4 flex justify-center items-center bg-backgroundColorTheme_1 text-textColorTheme'>
      <div className='w-full flex md:flex-row flex-col justify-center items-center lg:gap-4 gap-1'>
        <Image width={400} height={400} src={notFound} className='lg:w-[350px]' alt='پیدا نشد'/>
        <div className='flex flex-col justify-start items-start'>
          <h1 className='text-end md:text-3xl text-xl text-colorTheme font-semibold w-full'>!!! صفحه مورد نظر شما پیدا نشد </h1>
          <p className='text-end w-full lg:mt-5 mt-2 md:text-xl text-sm'>: برای ادامه از لینک زیر استفاده کنید</p>
          <Link className='w-full p-3 py-2 bg-colorTheme text-white text-center lg:mt-14 mt-5 rounded-md' href={"/"}>صفحه اصلی</Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound