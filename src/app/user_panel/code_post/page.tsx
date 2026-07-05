import { Metadata } from "next";
import React from "react";
import Title_panel_user from "./../../../components/title/Title_panel_user";
import Container_user_panel from "./../../../components/container/Container_user_panel";
import Code_post_list from "@/components/list/code_post_list";

export const metadata: Metadata = {
  title: {
    default: "سوزن رویا | کد پستی",
    template: "",
  },
  description: "",
};

function page() {
  return (
    <section className="w-full py-5 lg:px-10 px-6">
      <Title_panel_user title="کد پستی" />
      <Container_user_panel
        sidContent={{
          title: "آموزش",
          section:
            "شما میتوانید در این قسمت کد پستی های مربوط به خرید هاتون رو ویرایش کنید , کد پستی های شما ابتدا توسط سامانه استعلام میشود سپس فعال میشوند , در صورت فعال بودن میتوانید از انها برای خرید هاتون استفاده کنید",
          spaner_content:
            "شما فقط میتوانید 5 کد پستی داشته باشید , در صورت نیاز به کد پستی های بیشتر کد پستی های قبلی خود را حذف کنید",
        }}
      >
        <Code_post_list />
      </Container_user_panel>
    </section>
  );
}

export default page;
