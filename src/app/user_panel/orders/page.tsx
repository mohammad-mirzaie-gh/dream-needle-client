import { Metadata } from "next";
import React from "react";
import Title_panel_user from "./../../../components/title/Title_panel_user";
import Container_user_panel from "./../../../components/container/Container_user_panel";
import Order_list from "@/components/list/order_list";

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
      <Title_panel_user title="سفارش ها" />
      <Container_user_panel>
        <div className="w-full bg-[#2564eb5c] rounded-md p-2 px-4 mb-3">
          کاربر گرامی شما میتوانید از طریق طریق تیکت ها با ما در ارتباط باشید.
          در صورتی که پول محصول رو پرداخت کردید ولی وضعیت محصول تغیری نداشت,
          میتوانید از طریق پنل کاربری برای ما تیکت با شماره پیگیری فاکتور ارسال
          کنید تا ما سریعا پیگیری کنیم
        </div>
        <Order_list />
      </Container_user_panel>
    </section>
  );
}

export default page;
