import { Metadata } from 'next';
import React from 'react'
import Title_panel_user from "../../../../components/title/Title_panel_user";
import Container_user_panel from "../../../../components/container/Container_user_panel";
import Info_user_panel_pass from "../../../../components/forms/information_panel_user/Info_user_panel_pass";

export const metadata: Metadata = {
  title: {
    default: "edit password",
    template: ""
  },
  description: "این صفحه برای تغییر گذرواژه کاربر است",
};

function page() {
  return (
    <section className='w-full py-5 lg:px-10 px-6'>
      <Title_panel_user title='ویرایش شماره تلفن' />
      <Container_user_panel sidContent={{ title: "آموزش", section: "گذرواژه خود را بادقت انتخاب کنید , سعی کنید حداقل از حروف بزرگ و کوچک لاتین , علامت های نوشتاری @#$%& استفاده کنید", spaner_content: "در صورت فراموشی گذرواژه میتوانید از سرویس ایمیل برای ویرایش گذرواژه خود استفاده کنید" }} >
        <Info_user_panel_pass />
      </Container_user_panel>
    </section>
  )
}

export default page