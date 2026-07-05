import { Metadata } from "next";
import React from "react";
import Title_panel_user from "../../../components/title/Title_panel_user";
import Container_user_panel from "../../../components/container/Container_user_panel";
import Order_list from "@/components/list/admin_order_list";

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
            ایشالله اگه فربد شعورش از گراز بیشتر بشه برای ورژن دو هم فیلتر ها و قابلیت سرچ میزارم
        </div>
        <Order_list />
      </Container_user_panel>
    </section>
  );
}

export default page;
