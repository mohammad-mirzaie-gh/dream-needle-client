"use client";
import React, { useEffect } from "react";
import Title_panel_user from "../../../../components/title/Title_panel_user";
import Container_user_panel from "../../../../components/container/Container_user_panel";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { get_one_order } from "@/redux/orderSlice/action";
import { notFound, useParams } from "next/navigation";
import Big_loading from "@/components/loading/Big_loading";
import Status_order_shower from "@/components/utils/Status_order_shower";
import Image from "next/image";
import { get_way_payment } from "@/redux/paymentSlice/action";
function Page() {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const order = useAppSelector((state) => state.orderSlice.order);

  const get_order_information = async () => {
    try {
      const result = await dispatch(get_one_order({ id: String(id) }));
      if (get_one_order.fulfilled.match(result)) {
      } else {
        notFound();
      }
    } catch (err) {
      console.error(err);
      notFound();
    }
  };

  useEffect(() => {
    get_order_information();
  }, []);

  const get_pay_ment = async ({
    order,
    payment,
  }: {
    order: string;
    payment: string;
  }) => {
    try {
      const result2 = await dispatch(
        get_way_payment({ order_id: order, payment })
      );
      window.location.href = result2.payload.data;
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="w-full py-5 lg:px-10 px-6">
      <Title_panel_user title="سفارش" />
      <Container_user_panel
        sidContent={{
          title: "!!! توجه",
          section:
            "درصورتی که شما اقدام به پرداخت کردید و موفق به پرداخت نشدید میتوانید از طریق دکمه پرداخت اقدام به پرداخت سفارش مورد نظر بکیند ",
          spaner_content:
            "شما میتوانید از طریق تیکت ها سفارش خود را پیگیری کنید",
        }}
      >
        {order === "loading" ? (
          <div className="flex flex-row justify-center items-center w-full min-h-[300px]">
            <Big_loading />
          </div>
        ) : order && typeof order === "object" ? (
          <>
            <div className="bg-backgroundColorTheme_2 p-4 rounded-xl shadow-md flex flex-row justify-between items-start gap-2 w-full">
              <div className="flex flex-col justify-start items-start gap-2 w-full">
                <h3 className="font-bold text-lg mb-2 flex flex-row justify-between items-center w-full">
                  <span>شناسه سفارش</span>
                  {order.is_paid ? (
                    <div></div>
                  ) : (
                    <button onClick={()=>get_pay_ment({order : order._id , payment : order.pay_ment})} className="py-2 p-3 rounded-md bg-colorTheme font-semibold">
                      پرداخت سفارش
                    </button>
                  )}
                </h3>
                <p>
                  <span className="font-semibold">شناسه سفارش:</span>
                  {order._id}
                </p>
                <p>
                  <span className="font-semibold">قیمت سفارش:</span>
                  {order.amount.toLocaleString("fa-IR")} تومان
                </p>
              </div>
            </div>
            <div className="w-full mt-6 grid grid-cols-1 xl:grid-cols-2 gap-5">
              <div className="bg-backgroundColorTheme_2 p-4 rounded-xl shadow-md flex flex-col justify-start items-start gap-2">
                <h3 className="font-bold text-lg mb-2">مشخصات سفارش</h3>
                <p>
                  <span className="font-semibold">عنوان سفارش:</span>{" "}
                  {order.title}
                </p>
                <p className="my-2">
                  <span className="font-semibold">وضعیت:</span>{" "}
                  {Status_order_shower({ status: order.status })}
                </p>
                <p>
                  <span className="font-semibold">کدپستی:</span>{" "}
                  {order.zip_code}
                </p>
                <p>
                  <span className="font-semibold">روش پرداخت:</span>{" "}
                  {order.pay_ment === "zarinpal" ? "زرین پال" : order.pay_ment}
                </p>
                <p>
                  <span className="font-semibold">وضعیت پرداخت:</span>{" "}
                  {order.is_paid ? (
                    <span className="text-green-500 font-bold">پرداخت شده</span>
                  ) : (
                    <span className="text-red-600 font-bold">پرداخت نشده</span>
                  )}
                </p>
              </div>

              <div className="bg-backgroundColorTheme_2 p-4 rounded-xl shadow-md flex flex-col justify-start items-start gap-2">
                <h3 className="font-bold text-lg mb-2">مشخصات تحویل</h3>
                <p>
                  <span className="font-semibold">تحویل گیرنده:</span>{" "}
                  {order.receiver_delivery}
                </p>
                <p className="flex flex-col justify-start items-start gap-2">
                  <span className="font-semibold">توضیحات:</span>
                  <p className="p-2 rounded-md bg-[#2564eb5a]">
                    {order.description}
                  </p>
                </p>
                <p>
                  <span className="font-semibold">تاریخ ایجاد:</span>{" "}
                  {new Date(order.createdAt).toLocaleDateString("fa-IR")}
                </p>
              </div>

              <div className="col-span-1 xl:col-span-2 bg-backgroundColorTheme_2 p-4 rounded-xl shadow-md">
                <h3 className="font-bold text-lg mb-4">محصولات خریداری شده</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {order.purchases.map((item, index) => (
                    <>
                      <div
                        key={index}
                        className="bg-backgroundColorTheme_1 rounded-lg p-3 flex flex-col items-start"
                      >
                        <Image
                          width={"200"}
                          height={"200"}
                          quality={100}
                          className="rounded-md w-full h-full my-3"
                          src={`${process.env.NEXT_PUBLIC_SERVER}/uploads/products${item.product.thumbnail}`}
                          alt={item.product.title}
                        />
                        <p className="font-semibold">{item.product.title}</p>
                        <p className="flex flex-row justify-center items-center gap-2">
                          رنگ:{" "}
                          <span
                            className="inline-block w-4 h-4 rounded-full"
                            style={{ backgroundColor: item.color.color_code }}
                          ></span>{" "}
                          {item.color.title}
                        </p>
                        <p>سایز: {item.size.title}</p>
                        <p>تعداد: {item.count}</p>
                        <p>
                          قیمت واحد:{" "}
                          {item.product.price.toLocaleString("fa-IR")} تومان
                        </p>
                        <p>
                          قیمت کل:{" "}
                          {(item.product.price * item.count).toLocaleString(
                            "fa-IR"
                          )}{" "}
                          تومان
                        </p>
                      </div>
                    </>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : null}
      </Container_user_panel>
    </section>
  );
}

export default Page;
