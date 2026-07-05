"use client";
import {
  create_code_post,
  delete_code_post,
  get_all_code_post,
} from "@/redux/codepostSlice/action";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import React, { useEffect, useId, useState } from "react";
import Input from "../input/Input";
import toast from "react-hot-toast";
import Loading from "@/components/loading/Loading";
import Empty from "../../../public/image/empty/empty.png";
import Image from "next/image";
import { FaRegTrashAlt } from "react-icons/fa";

interface ApiResponse {
  message: string;
}

function Cart_list() {
  const [active_tab, setActive_tab] = useState<
    "new_code_post" | "list_code_post"
  >("list_code_post");

  const [data, setData] = useState({
    title: "",
    postal_code: "",
  });
  const dispatch = useAppDispatch();
  const code_posts = useAppSelector((state) => state.codepostSlice.code_posts);

  useEffect(() => {
    dispatch(get_all_code_post());
  }, []);

  const unID = {
    inputTitle: useId(),
    inputCodePost: useId(),
  };

  const dataChanger = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const send_code_post = async () => {
    if (!data.title) {
      toast.error("عنوان اجباری است");
    } else if (data.title.length >= 50) {
      toast.error("متن شما نباید بیشتر از 50 کاراکتر باشد");
    } else if (!data.postal_code || data.postal_code.length !== 10) {
      toast.error("کد پستی باید 10 رقم باشد");
    } else {
      try {
        const result = (await dispatch(create_code_post(data))) as {
          payload: ApiResponse;
        };
        if (create_code_post.fulfilled.match(result)) {
          dispatch(get_all_code_post());
          toast.success(result.payload.message);
          setActive_tab("list_code_post");
        } else {
          toast.error(result.payload.message);
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

const delete_post = async(i : string)=>{
  toast.promise(Promise.all([
    await dispatch(delete_code_post({id :i})),
    await dispatch(get_all_code_post())
  ]) , {
    loading: "در حال حذف",
    error : "خطا در حذف",
    success : "با موفقیت حذف شد"
  })
}

  return (
    <section className="w-full">
      <div className="w-full flex flex-row justify-start items-center gap-5">
        <h3
          onClick={() => setActive_tab("list_code_post")}
          className={`font-lalezarFont cursor-pointer text-[18px] ${
            active_tab === "list_code_post" ? "text-colorTheme" : ""
          }`}
        >
          لیست کد پستی
        </h3>
        <h3
          onClick={() => setActive_tab("new_code_post")}
          className={`font-lalezarFont cursor-pointer text-[18px] ${
            active_tab === "new_code_post" ? "text-colorTheme" : ""
          }`}
        >
          کد پستی جدید
        </h3>
      </div>
      <div className="w-full mt-5">
        {active_tab === "new_code_post" ? (
          <>
            <div className="w-full grid mb-6 gap-5 md:grid-cols-2">
              <div className="w-full flex flex-col justify-start items-center mb-3">
                <Input
                  type="text"
                  placeholder=""
                  align_text={"end"}
                  disabled={false}
                  id={unID.inputTitle}
                  setValue={dataChanger}
                  title={"عنوان"}
                  name="title"
                  value={data.title}
                />
              </div>
              <div className="w-full flex flex-col justify-start items-center mb-3">
                <Input
                  type="text"
                  placeholder=""
                  align_text={"end"}
                  disabled={false}
                  id={unID.inputCodePost}
                  setValue={dataChanger}
                  title={"کد پستی"}
                  name="postal_code"
                  value={data.postal_code}
                />
              </div>
            </div>
            <button
              onClick={send_code_post}
              className="w-full text-white bg-colorTheme py-2 px-3 rounded-md mt-5 font-bold"
            >
              ثبت کد پستی
            </button>
          </>
        ) : (
          <div className="w-full flex flex-col justify-start items-start gap-3">
            {code_posts === "loading" ? (
              <Loading />
            ) : typeof code_posts === "object" ? (
              code_posts && code_posts[0] ? (
                code_posts?.map((i) => (
                  <div key={i._id} className="w-full relative p-3 rounded-md bg-backgroundColorTheme_2 flex flex-row justify-between items-center gap-2">
                    <div style={{backgroundColor : "#2563eb"}} className="h-[25px] w-[5px] rounded-md absolute -right-[2px]"></div>
                    <p className="truncate text-start max-sm:text-sm">{i.title}</p>
                    <div className="flex flex-row justify-end items-center gap-2">
                      <div className="max-sm:text-xs">
                        {i.postal_code}
                      </div>
                      <button onClick={()=>delete_post(i._id)} className="rounded-md">
                        <FaRegTrashAlt className="text-red-500" size={15}/>
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="w-full flex flex-col justify-center items-center ">
                  <Image
                    alt="کد پستی خالی"
                    src={Empty}
                    width={200}
                    height={200}
                  />
                  <p>کد پستی شما خالی است</p>
                </div>
              )
            ) : null}
          </div>
        )}
      </div>
    </section>
  );
}

export default Cart_list;
