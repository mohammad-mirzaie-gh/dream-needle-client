"use client";
import React, { useEffect, useId, useState } from "react";
import Title_panel_user from "../../../../components/title/Title_panel_user";
import Container_user_panel from "../../../../components/container/Container_user_panel";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  get_admin_one_order,
  get_one_order,
  delete_order,
  update_order_information,
} from "@/redux/orderSlice/action";
import { notFound, useParams } from "next/navigation";
import toast from "react-hot-toast";
import Big_loading from "@/components/loading/Big_loading";
import Status_order_shower from "@/components/utils/Status_order_shower";
import Image from "next/image";
import Input from "@/components/input/Input";
function Page() {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const order = useAppSelector((state) => state.orderSlice.order);

  const get_order_information = async () => {
    try {
      const result = await dispatch(get_admin_one_order({ id: String(id) }));
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

  const [data, setData] = useState({
    user_description: "",
    receiver_delivery: "",
    pay_ment: "",
    zip_code: "",
  });
  const unID = {
    inputName: useId(),
    inputLastname: useId(),
    inputPhone: useId(),
    inputEmail: useId(),
    inputAddress: useId(),
  };
  const dataChanger = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const active_order = async ({
    status,
    id,
  }: {
    status: boolean;
    id: string;
  }) => {
    try {
      const result2 = await dispatch(delete_order({ id: id, status }));
      if (delete_order.fulfilled.match(result2)) {
        toast.success("فعالیت با موفقیت تغیر کرد");
        get_order_information();
      } else {
        const message = result2.payload as { message: string };
        toast.error(message.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const send_information = async ({
    id,
    user ,
    user_description,
    receiver_delivery,
    pay_ment,
    zip_code,
  }: {
    user : string
    id: string;
    user_description: string;
    receiver_delivery: string;
    pay_ment: string;
    zip_code: string;
  }) => {
    try {
      const result2 = await dispatch(
        update_order_information({
          id,
          user_description: data.user_description || user_description,
          receiver_delivery: data.receiver_delivery || receiver_delivery,
          pay_ment: data.pay_ment || pay_ment,
          zip_code: data.zip_code || zip_code,
          user
        })
      );
      if (update_order_information.fulfilled.match(result2)) {
        toast.success("اطلاعات کاربر با موفقیت تغیر کرد");
        get_order_information();
      } else {
        const message = result2.payload as { message: string };
        toast.error(message.message);
      }
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
            <div className="bg-backgroundColorTheme_1 p-4 rounded-xl w-full">
              <h3 className="font-semibold my-5 text-xl">ویرایش اطلاعات</h3>
              <div className="w-full grid gap-6 lg:grid-cols-2">
                <div className="w-full flex flex-col justify-start items-center mb-3">
                  <Input
                    placeholder=""
                    align_text={"start"}
                    disabled={false}
                    id={unID.inputName}
                    setValue={dataChanger}
                    title={"توضیحات کاربر"}
                    name="user_description"
                    value={data.user_description}
                  />
                </div>
                <div className="w-full flex flex-col justify-start items-center mb-3">
                  <Input
                    placeholder=""
                    align_text={"start"}
                    disabled={false}
                    id={unID.inputLastname}
                    setValue={dataChanger}
                    title={"تحویل گیرنده"}
                    name="receiver_delivery"
                    value={data.receiver_delivery}
                  />
                </div>
                <div className="w-full flex flex-col justify-start items-center mb-3">
                  <Input
                    placeholder=""
                    align_text={"end"}
                    disabled={false}
                    id={unID.inputEmail}
                    setValue={dataChanger}
                    title={"درگاه پرداخت"}
                    name="pay_ment"
                    value={data.pay_ment}
                  />
                </div>
                <div className="w-full flex flex-col justify-start items-center mb-3">
                  <Input
                    placeholder=""
                    align_text={"end"}
                    disabled={false}
                    id={unID.inputPhone}
                    setValue={dataChanger}
                    title={"کد پستی"}
                    name="zip_code"
                    value={data.zip_code}
                  />
                </div>
              </div>
              <button
                onClick={() => {
                  send_information({
                    id: order._id,
                    pay_ment: order.pay_ment,
                    receiver_delivery: order.receiver_delivery,
                    user_description: order.description,
                    zip_code: order.zip_code,
                    user : order.user._id
                  });
                }}
                className="w-full bg-colorTheme py-2 p-3 mt-6 rounded-md"
              >
                ثبت اطلاعات
              </button>
            </div>

            <hr className="w-full border-none h-[1px] bg-[#555] my-5" />

            <div className="bg-backgroundColorTheme_2 p-4 rounded-xl shadow-md flex flex-row justify-between items-start gap-2 w-full">
              <div className="flex flex-col justify-start items-start gap-2 w-full">
                <h3 className="font-bold text-lg mb-2 flex flex-row justify-between items-center w-full">
                  <span>شناسه سفارش</span>
                  {order.active_order ? (
                    <button
                      onClick={() => {
                        active_order({ id: order._id, status: false });
                      }}
                      className="bg-red-600 text-white rounded-md py-2 px-3 text-sm"
                    >
                      غیر فعال کردن
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        active_order({ id: order._id, status: true });
                      }}
                      className="bg-green-600 text-white rounded-md py-2 px-3 text-sm"
                    >
                      فعال کردن
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
                <h3 className="font-bold text-lg mb-2 flex flex-row justify-between items-center w-full">
                  <span>شناسه کاربری</span>
                  <div></div>
                </h3>
                <p>
                  <span className="font-semibold">نام و نام خانوادگی :</span>
                  {order.user?.name + " " + order.user?.lastname}
                </p>
                <p>
                  <span className="font-semibold">شماره تلفن :</span>
                  {order.user?.phone}
                </p>
                <p>
                  <span className="font-semibold">آدرس ایمیل :</span>
                  {order.user?.email}
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
