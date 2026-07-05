"use client";
import { get_all_code_post } from "@/redux/codepostSlice/action";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import React, { useEffect, useState } from "react";
import Loading from "@/components/loading/Loading";

import Input from "@/components/input/Input";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { get_way_payment } from "@/redux/paymentSlice/action";
import { create_order } from "@/redux/orderSlice/action";

function Page() {
  const [codePost, setCodePost] = useState("");
  const [extra_information, setExtra_information] = useState({
    receiver_delivery: "",
    description: "",
  });
  const [payment, setPayment] = useState("");

  const dispatch = useAppDispatch();
  const code_posts = useAppSelector((state) => state.codepostSlice.code_posts);

  useEffect(() => {
    dispatch(get_all_code_post());
  }, []);

  const send_information = async () => {
    try {
      if (codePost.length !== 10) {
        toast.error("کد پستی باید 10 رقم باشد");
      } else if (!payment) {
        toast.error("لطفا درگاه خود را انتخاب کنید");
      } else {
        const result = await dispatch(
          create_order({
            pay_ment: payment,
            receiver_delivery: extra_information.receiver_delivery,
            description: extra_information.description,
            zip_code: codePost,
          })
        );
        if (create_order.fulfilled.match(result)) {
          const result2 = await dispatch(
            get_way_payment({
              order_id: result.payload.data._id,
              payment: payment,
            })
          );
          window.location.href = result2.payload.data;
        } else {
          const error = result.payload as { message: string };
          toast.error(error?.message || "");
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex relative flex-col justify-between items-center w-full min-h-[100dvh] bg-backgroundColorTheme_2 text-textColorTheme">
      <section className="w-full flex flex-col gap-5 max-w-[1200px] my-10 md:px-5">
        <h1 className="font-lalezarFont text-3xl font-semibold text-colorTheme">
          ثبت سفارش
        </h1>
        <div className="w-full rounded-md flex md:flex-row flex-col-reverse md:justify-between justify-start items-start gap-5 relative">
          <div className="w-full bg-backgroundColorTheme_1 rounded-md p-5">
            <h3 className="font-lalezarFont text-lg mb-1">انتخاب کد پستی</h3>
            <div className="flex flex-row justify-start items-start flex-wrap relative">
              <p className="bg-[#2564eb75] text-sm my-3 p-2 rounded-md text-white">
                در وارد کردن کد پستی خود دقت داشته باشید
                <span className="text-red-500 mx-1">
                  در صورت اشتباه بودن فروشگاه هیچگونه وظیفه ای در این قبال ندارد
                </span>{" "}
                ( کد پستی قبل از ارسال توسط پست چک میشود در صورت اشتباه بودن
                میتوانید دوباره تلاش کنید )
              </p>
              {code_posts === "loading" ? (
                <Loading />
              ) : typeof code_posts === "object" &&
                code_posts &&
                code_posts[0] ? (
                code_posts.map((i) => (
                  <div
                    key={i._id}
                    onClick={() => {
                      setCodePost(i.postal_code);
                    }}
                    className="p-3 rounded-md w-full flex flex-row gap-3 justify-start items-start bg-backgroundColorTheme_2 my-2 relative cursor-pointer"
                  >
                    <div
                      style={{
                        backgroundColor:
                          i.postal_code === codePost ? "#2563eb" : "",
                      }}
                      className="absolute right-0 w-[5px] h-[20px] rounded-md top-[14px]"
                    ></div>
                    <h4 className="text-base">{i.title}</h4>
                    <span>{i.postal_code}</span>
                  </div>
                ))
              ) : (
                <Input
                  align_text={"start"}
                  id={"1234"}
                  disabled={false}
                  name="code_posts"
                  placeholder="کد پستی باید 10 رقم باشد"
                  setValue={(e) => {
                    setCodePost(e.target.value);
                  }}
                  value={codePost}
                  autoComplete={"off"}
                  title={"کد پستی را وارد کنید"}
                ></Input>
              )}
            </div>
            <hr className="w-full border-0 h-[1px] bg-[#555] my-5" />
            <div>
              <h3 className="font-lalezarFont text-lg mb-1">توضیحات اضافه</h3>
              <div className="mt-5 flex flex-col justify-start items-start gap-2">
                <Input
                  align_text={"start"}
                  id={"1234"}
                  disabled={false}
                  name="code_posts"
                  placeholder="نام تحویل گیرنده (به صورت پیش فرض صاحب همین حساب)"
                  setValue={(e) => {
                    setExtra_information((prev) => ({
                      ...prev,
                      receiver_delivery: e.target.value,
                    }));
                  }}
                  value={extra_information.receiver_delivery}
                  autoComplete={"off"}
                  title={"تحویل گیرنده (اختیاری)"}
                ></Input>
                <textarea
                  onChange={(e) => {
                    const target = e.target as HTMLTextAreaElement;
                    setExtra_information((prev) => ({
                      ...prev,
                      description: target.value,
                    }));
                  }}
                  value={extra_information.description}
                  className="bg-backgroundColorTheme_2 rounded-md border-0 w-full p-3 placeholder:text-[#55555576] min-h-[200px]"
                  placeholder="توضیحات اضافی (اختیاری)"
                ></textarea>
              </div>
            </div>
          </div>
          <div className="md:w-[500px] w-full bg-backgroundColorTheme_1 rounded-md p-5">
            <>
              <h3 className="font-lalezarFont text-xl">توضیحات فروش</h3>
              <p className="sm:text-sm text-xs my-2 mb-5 bg-[#2564eb75] p-3 rounded-md text-textColorTheme leading-5 text-justify">
                هنگامی که شما ثبت سفارش میکنید سفارشی برای سبد خرید حال حاضر به
                وجود میاد و شما میتوانید نسبت به پرداخت این سفارش اقدام نمایید
                در نظر داشته باشید تا وقتی شما سفارش را پرداخت نکرده باشید امکان
                تموم شدن موجودی محصول در انبار وجود دارد , در صورتی که موجودی
                این محصول در انبار تمام شود سفارش شما به صورت خودکار غیر فعال
                میشود اما اگر مبلغ سفارش را پرداخت کنید محصول برای شما در نظر
                گرفته میشود و دیگر سفارش شما لغو نخواهد شد . شما میتوانید در
                صفحه{" "}
                <Link
                  href={"/user_panel/orders"}
                  className="text-red-500 font-bold"
                >
                  سفارشات کاربر
                </Link>{" "}
                سفارشات خود را مشاهده نمایید
              </p>
            </>
            <div className="flex flex-row justify-start items-start my-5 mx-1 gap-3 h-[75px]">
              <Image
                onClick={() => {
                  setPayment("zarinpal");
                }}
                className={`${
                  payment === "zarinpal"
                    ? "border-[3px] border-colorTheme border-dotted"
                    : ""
                } duration-100 transition-all cursor-pointer rounded-md`}
                src={"https://cdn.zarinpal.com/badges/trustLogo/1.png"}
                alt="ایکون زرین پال"
                width={50}
                height={50}
              ></Image>
              <Image
                onClick={() => {
                  setPayment("bitpay");
                }}
                className={`${
                  payment === "bitpay"
                    ? "border-[3px] border-colorTheme border-dotted"
                    : ""
                } duration-100 transition-all cursor-pointer rounded-md`}
                src={"https://bitpay.ir/theme/public/images/trusted-logo.svg"}
                alt="ایکون بیت پی"
                width={50}
                height={50}
              ></Image>
            </div>
            <button
              onClick={send_information}
              className="bg-colorTheme py-2 px-3 w-full rounded-md text-white font-semibold"
            >
              ثبت سفارش و پرداخت
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Page;
