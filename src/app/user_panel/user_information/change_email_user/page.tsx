import { Metadata } from 'next';
import React from 'react'
import Title_panel_user from "../../../../components/title/Title_panel_user";
import Container_user_panel from "../../../../components/container/Container_user_panel";
import Info_user_panel_email from "../../../../components/forms/information_panel_user/Info_user_panel_email";

export const metadata: Metadata = {
  title: {
    default: "edit email",
    template: ""
  },
  description: "این صفحه برای تغییر آدرس ایمیل کاربر است",
};

function page() {
  return (
    <section className='w-full py-5 lg:px-10 px-6'>
      <Title_panel_user title='ویرایش آدرس ایمیل' />
      <Container_user_panel sidContent={{ title: "آموزش", section: "ایمیل مورد نظر خود را وارد کنید و سپس دریافت کد برای این ایمیل را بزنید کد به ایمیل شما ارسال میشود و شما کد را وارد میکنید"}} >
        <Info_user_panel_email />
      </Container_user_panel>
    </section>
  )
}

export default page