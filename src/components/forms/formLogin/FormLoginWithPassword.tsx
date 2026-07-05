"use client";

import {
  login_whit_phone_validateCode,
  login_whit_phone_sendCode,
  loginWhitPassword,
} from "@/redux/authSlice/action";
import { setBoolean } from "@/redux/authSlice/authSlice";
import React, { useId, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../../redux/store";
import Input from "@/components/input/Input";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Timer from "@/components/timer/Timer";
import Loading from "./../../../components/loading/Loading";
import { get_is_login } from "@/redux/userSlice/action";

interface ApiResponse {
  message: string;
  is_new?: boolean;
  captcha?: boolean;
}

interface SendData {
  phone?: string;
  password?: string;
  code?: string;
}

function FormLogin({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const phone = useAppSelector((state) => state.authSlice.phone);
  const router = useRouter();
  const loading_email_code = useAppSelector(
    (state) => state.authSlice.loading_email_code
  );

  const [login, setLogin] = useState("password");
  const is_sendEmail = useAppSelector((state) => state.authSlice.is_sendEmail);
  const [data, setData] = useState({
    phone: phone,
    password: "",
    code: "",
  });

  const unID = {
    inputPhone: useId(),
    inputPassword: useId(),
    inputEmail: useId(),
  };
  if (phone) {
    const setIs_sendEmail = (data: boolean) => {
      dispatch(setBoolean(data));
    };

    const getCode_phone = async () => {
      if (login === "phone") {
        try {
          const result = (await dispatch(login_whit_phone_sendCode())) as {
            payload: ApiResponse;
          };
          if (login_whit_phone_validateCode.fulfilled.match(result)) {
            toast.success("کد از طریق پیامک به شماره تلفن مربوطه ارسال شد");
          } else {
            if (login_whit_phone_validateCode.rejected.match(result)) {
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
      }
    };

    const dataChanger = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setData((state) => ({
        ...state,
        [name]: value,
      }));
    };

    const validate_login_pass = () => {
      if (!data.phone) {
        toast.error("درخواست شما باید شامل شماره تلفن باشد");
      } else if (data.password && data.password.length <= 7) {
        toast.error("درخواست شما باید  شامل رمز ورود 8 رقمی باشد");
      } else {
        sendData({ phone: data.phone, password: data.password });
      }
    };
    const validate_login_phone = () => {
      if (!data.code) {
        toast.error("درخواست شما باید شامل کد ارسال شده به شماره تلفن باشد");
      } else if (data.code.length !== 5) {
        toast.error("درخواست شما باید شامل کد تایید 5 رقمی باشد");
      } else {
        sendData({ code: data.code });
      }
    };

    const sendData = async (data: SendData) => {
      try {
        const result = (await dispatch(
          login === "password"
            ? loginWhitPassword(data)
            : login_whit_phone_validateCode(data)
        )) as { payload: ApiResponse };
        if (loginWhitPassword.fulfilled.match(result)) {
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
          toast.success(result.payload.message);
        }
        if (loginWhitPassword.rejected.match(result)) {
          if (result.payload.captcha === false) {
            router.replace("/authentication");
          }
          toast.error(result?.payload?.message);
        }
        if (login_whit_phone_validateCode.fulfilled.match(result)) {
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
          toast.success(result.payload.message);
        }
        if (login_whit_phone_validateCode.rejected.match(result)) {
          if (result.payload.captcha === false) {
            router.replace("/authentication");
          }
          toast.error(result?.payload?.message);
        }
      } catch (err) {
        console.error(err);
      }
    };

    return (
      <form
        onSubmit={(e) => e.preventDefault()}
        className="sm:w-[400px] xs:w-[350px] w-[300px] p-5 flex flex-col justify-start items-center gap-3 shadow-boxing rounded-md"
      >
        {children}
        {login === "password" ? (
          <>
            <div className="w-full flex flex-col justify-start items-center mb-3">
              <Input
                placeholder={""}
                align_text={"end"}
                disabled={true}
                id={unID.inputPhone}
                setValue={dataChanger}
                title={"شماره تلفن"}
                name="phone"
                value={data.phone}
              />
            </div>
            <div className="w-full flex flex-col justify-start items-center mb-3">
              <Input
                placeholder="a3w54d6aw4d"
                align_text={"end"}
                disabled={false}
                id={unID.inputPassword}
                setValue={dataChanger}
                title={"گذرواژه"}
                name="password"
                value={data.password}
              />
            </div>
          </>
        ) : null}
        {login === "phone" ? (
          <>
            <div className="w-full flex flex-col justify-start items-center mb-3">
              <Input
                placeholder="12345"
                align_text={"center"}
                disabled={false}
                id={unID.inputEmail}
                setValue={dataChanger}
                title={"کد تایید"}
                name="code"
                value={data.code}
              />
            </div>
            <p>کد به صورت خودکار به شماره تلفن ثبت شده ارسال میشود</p>
            {loading_email_code === true ? (
              <Loading />
            ) : is_sendEmail === false ? (
              <button
                onClick={getCode_phone}
                className="w-full bg-colorTheme rounded-md py-2 px-3 font-bold text-white "
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
          </>
        ) : null}
        <button
          onClick={
            login === "password" ? validate_login_pass : validate_login_phone
          }
          className="w-full bg-colorTheme rounded-md py-2 px-3 font-bold text-white mt-8"
        >
          ورود
        </button>
        {login === "password" ? (
          <button
            onClick={() => {
              setLogin("phone");
            }}
            className="w-full py-1 text-textColorTheme"
          >
            ورود با کد شماره تلفن
          </button>
        ) : (
          <button
            onClick={() => {
              setLogin("password");
            }}
            className="w-full py-1 text-textColorTheme"
          >
            ورود با گذرواژه
          </button>
        )}
      </form>
    );
  } else {
    router.replace("/authentication");
  }
}

export default FormLogin;
