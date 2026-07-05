"use client";

import Input from "@/components/input/Input";
import { setBoolean, phoneEmailSaver } from "@/redux/authSlice/authSlice";
import {
  register_sendCode_phone,
  register_phone,
} from "@/redux/authSlice/action";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useRouter } from "next/navigation";
import React, { useId, useState } from "react";
import toast from "react-hot-toast";
import Timer from "@/components/timer/Timer";
import Loading from "./../../../components/loading/Loading";
import { emailFormater, numberFormater } from "./../../../utils/formats/regExe";
import { get_is_login } from "@/redux/userSlice/action";

import PasswordStrengthBar from "react-password-strength-bar";

interface ApiResponse {
  message: string;
  is_new?: boolean;
  captcha?: boolean;
  refresh?: boolean;
}

function FormRegister({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const phone = useAppSelector((state) => state.authSlice.phone);
  const is_sendEmail = useAppSelector((state) => state.authSlice.is_sendEmail);
  const loading_email_code = useAppSelector(
    (state) => state.authSlice.loading_email_code
  );

  const router = useRouter();
  const [data, setData] = useState({
    name: "",
    lastname: "",
    phone: phone,
    password: "",
    confiremPassword: "",
    email: "",
    code: "",
  });
  const [is_code_phone, setIs_code_phone] = useState(false);
  const unID = {
    inputName: useId(),
    inputLastname: useId(),
    inputPhone: useId(),
    inputPassword: useId(),
    inputEmail: useId(),
    inputCode: useId(),
  };

  const scoreWords = ['خیلی ضعیف', 'ضعیف', 'متوسط', 'قوی', 'خیلی قوی'];
  const shortScoreWord = 'خیلی کوتاه';

  if (phone) {
    const setIs_sendEmail = (data: boolean) => {
      dispatch(setBoolean(data));
    };

    const dataChanger = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setData((state) => ({
        ...state,
        [name]: value,
      }));
    };

    const getCode_phone = async () => {
      try {
        const result = (await dispatch(
          register_sendCode_phone({ phone: data.phone })
        )) as { payload: ApiResponse };
        if (register_sendCode_phone.fulfilled.match(result)) {
          toast.success(result?.payload?.message);
          dispatch(phoneEmailSaver(data.phone));
          setIs_code_phone(true);
        } else {
          if (register_sendCode_phone.rejected.match(result)) {
            if (result.payload?.captcha === false) {
              router.replace("/authentication");
            }
            toast.error(result?.payload?.message);
          }
        }
        setIs_sendEmail(true);
      } catch (err) {
        console.error(err);
      }
    };

    const validate_register = () => {
      if (!data.code && data.code.length !== 5) {
        toast.error("کد تایید شامل 5 رقم میباشد");
      } else if (!data.email && emailFormater.test(data.email)) {
        toast.error("لطفا آدرس ایمیل معتبر وارد کنید");
      } else if (!data.phone || numberFormater.test(data.phone) === false) {
        toast.error("لطفا شماره تماس معتبر وارد کنید");
      } else if (!data.password || data.password.length <= 7) {
        toast.error("گذرواژه نمیتواند از 8 حرف کمتر باشد");
      } else if (data.password !== data.confiremPassword) {
        toast.error("گذرواژه با تکرار گذرواژه برابر نیست");
      } else {
        sendData({
          name: data.name,
          lastname: data.lastname,
          email: data.email,
          phone: data.phone,
          password: data.password,
          code: data.code,
        });
      }
    };

    const sendData = async (data: {
      name: string;
      lastname: string;
      email: string;
      phone: string;
      password: string;
      code: string;
    }) => {
      try {
        const result = (await dispatch(register_phone(data))) as {
          payload: ApiResponse;
        };
        if (register_phone.fulfilled.match(result)) {
          try {
            try {
              const result_info = (await dispatch(get_is_login())) as {
                payload: ApiResponse;
              };
              if (get_is_login.fulfilled.match(result_info)) {
                router.replace("/");
              } else {
                toast.error("مشکلی پیش آمده لطفا بعدا تلاش کنید");
              }
              return result;
            } catch (err) {
              console.error(err);
            }
          } catch (err) {
            console.error(err);
          }
          toast.success(result.payload.message);
        }
        if (register_phone.rejected.match(result)) {
          if (result.payload.captcha === false) {
            router.replace("/authentication");
          } else if (result.payload.refresh === true) {
            setIs_sendEmail(false);
          }
          toast.error(result?.payload?.message);
        }
      } catch (err) {
        console.error(err);
      }
    };

    return (
      <form
        autoComplete="off"
        onSubmit={(e) => e.preventDefault()}
        className="sm:w-[600px] xs:w-[380px] w-[320px] p-5 flex flex-col justify-start items-center gap-3 shadow-boxing rounded-md"
      >
        {children}
        {
          <>
            <div className="w-full flex flex-col justify-center items-center mb-6">
              <div className="w-full flex flex-col justify-start items-center mb-3">
                <Input
                  placeholder=""
                  align_text={"end"}
                  disabled={true}
                  id={unID.inputPhone}
                  setValue={dataChanger}
                  title={"شماره تلفن"}
                  name="phone"
                  value={data.phone}
                  autoComplete="off"
                />
              </div>
              <div className="w-full flex flex-col justify-start items-center mb-3">
                <Input
                  placeholder=""
                  align_text={"end"}
                  disabled={false}
                  id={unID.inputEmail}
                  setValue={dataChanger}
                  title={"آدرس ایمیل"}
                  name="email"
                  value={data.email}
                  type="email"
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="w-full grid gap-6 mb-6 md:grid-cols-2">
              <div className="w-full flex flex-col justify-start items-center mb-3">
                <Input
                  type="password"
                  placeholder=""
                  align_text={"end"}
                  disabled={false}
                  id={unID.inputPassword}
                  setValue={dataChanger}
                  title={"گذرواژه"}
                  name="password"
                  value={data.password}
                  autoComplete="new-password"
                />
              </div>
              <div className="w-full flex flex-col justify-start items-center mb-3">
                <Input
                  type="password"
                  placeholder=""
                  align_text={"end"}
                  disabled={false}
                  id={""}
                  setValue={dataChanger}
                  title={"تکرار گذرواژه"}
                  name="confiremPassword"
                  value={data.confiremPassword}
                />
              </div>
              <PasswordStrengthBar
                password={data.password}
                scoreWords={scoreWords}
                shortScoreWord={shortScoreWord}
              />
            </div>
            <p className="px-2">
              ما برای گزارش وضعیت و فراموشی رمز عبور نیاز به شماره تلفن حقیقی
              داریم , برای همین نیاز هست تا ابتدا شماره تلفن شما تایید بشه
            </p>
            {loading_email_code === true ? (
              <Loading />
            ) : is_sendEmail === false ? (
              <button
                onClick={getCode_phone}
                className="w-full bg-colorTheme rounded-md py-2 px-3 font-bold text-white"
              >
                دریافت کد
              </button>
            ) : (
              <p className="cursor-pointer text-[#666]">
                <Timer
                  handler={() => {
                    setIs_sendEmail(false);
                  }}
                  time_value={120}
                />{" "}
                دیگر امتحان کنید
              </p>
            )}
            {is_code_phone === true ? (
              <>
                <div className="w-full flex flex-col justify-start items-center mb-3">
                  <Input
                    placeholder="12345"
                    align_text={"center"}
                    disabled={false}
                    id={unID.inputCode}
                    setValue={dataChanger}
                    title={"کد تایید"}
                    name="code"
                    value={data.code}
                  />
                </div>
                <button
                  onClick={validate_register}
                  className="w-full bg-colorTheme rounded-md py-2 px-3 font-bold text-white mt-8"
                >
                  ثبت نام
                </button>
              </>
            ) : null}
          </>
        }
      </form>
    );
  } else {
    router.replace("/authentication");
  }
}

export default FormRegister;
