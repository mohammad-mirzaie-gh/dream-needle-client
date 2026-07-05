import { Metadata } from 'next';
import React from 'react'
import Title_panel_user from "./../../../components/title/Title_panel_user";
import Container_user_panel from "./../../../components/container/Container_user_panel";
import Info_user_panel from "./../../../components/forms/information_panel_user/Info_user_panel";

export const metadata: Metadata = {
  title: {
    default: "user information",
    template: ""
  },
  description: "",
};

function page() {
  return (
    <section className='w-full py-5 lg:px-10 px-6'>
      <Title_panel_user title='حساب کاربر' />
      <Container_user_panel sidContent={{ title: "!!! توجه", section: "لطفا از درست بودن اطلاعات خود اطمینان حاصل فرمایید (در هنگام خرید با استفاده از map آدرس دقیق محل سکونت شما برای تحویل دادن محصول دریافت میکنیم)", spaner_content: "در صورت مشکل داشتن اطلاعات فروشگاه هیچ وظیفه ای در قبال مشتری ندارد" }} >
        <Info_user_panel />
      </Container_user_panel>
    </section>
  )
}

export default page