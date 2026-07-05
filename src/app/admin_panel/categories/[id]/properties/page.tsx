"use client";
import React, { useEffect, useId, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { create_property, get_all_property } from "@/redux/category/action";
import Title_panel_user from "./../../../../../components/title/Title_panel_user";
import Counter_admin_panel from "./../../../../../components/container/Container_user_panel";
import Loading from "./../../../../../components/loading/Loading";
import { dateChanger } from "./../../../../../utils/functions/dateChange/dateChange";
import toast from "react-hot-toast";
import { TbEyeCode } from "react-icons/tb";
import Input from "@/components/input/Input";
import Selector from "@/components/selector/selector";
import InputAdder from "@/components/input/InputAdder";
import { FaRegTrashCan } from "react-icons/fa6";

interface ApiResponse {
  message: string;
}

function Page() {
  const route = useRouter();
  const id_category = useParams().id;
  const dispatch = useAppDispatch();
  const properties = useAppSelector((state) => state.categorySlice.properties);
  const dataChanger = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((state) => ({
      ...state,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (typeof id_category === "string") {
      dispatch(get_all_property({ id: id_category }));
    } else {
      toast.error("خطای داخلی");
      route.push("/admin_panel/category");
    }
  }, []);

  const [data, setData] = useState<{
    title: string;
    type: string;
    body: string[];
    category: string | string[] | undefined;
  }>({
    title: "",
    type: "",
    body: [],
    category: id_category,
  });

  const unID = {
    inputTitle: useId(),
    input_value_type: useId(),
  };

  const handleCreate = async () => {
    try {
      const result = (await dispatch(create_property({ data }))) as {
        payload: ApiResponse;
      };
      if (create_property.fulfilled.match(result)) {
        toast.success("ویژگی شما با موفقیت ساخته شد");
      } else {
        toast.error(result.payload.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="w-full py-5 lg:px-10 px-6">
      <Title_panel_user title={`ویژگی های دسته بندی`} />
      <Counter_admin_panel
        sidContent={{
          title: "آموزش",
          section:
            "داخل این بخش فقط میتوانید قابلیت هایی که مربوط به هر دسته بندی میشه رو ببینید ",
          spaner_content:
            "با حذف کردن دسته بندی تمامی ویژگی های وابسته از بین میروند",
        }}
      >
        {properties === "loading" ? (
          <div className="flex flex-row justify-center items-center">
            <Loading />
          </div>
        ) : (
          <>
            <div className=" flex flex-col justify-start items-center w-full">
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex flex-col justify-start items-start gap-3 w-full"
              >
                <h2 className="font-semibold text-textColorTheme text-2xl">
                  افزودن ویژگی جدید
                </h2>
                <div className="flex flex-row justify-start items-center gap-3 flex-wrap">
                  <div className="w-full flex flex-col justify-start items-center mb-3">
                    <Input
                      placeholder=""
                      align_text={"start"}
                      disabled={false}
                      id={unID.inputTitle}
                      setValue={dataChanger}
                      title={"نام ویژگی"}
                      name="title"
                      value={data.title}
                    />
                  </div>
                  <div className="w-full flex flex-col justify-start items-center mb-3">
                    <Selector
                      data={["input", "selector", "multiple_selection"]}
                      value={data.type}
                      ChangeHandler={(select) => {
                        setData(() => {
                          return {
                            ...data,
                            body: [],
                            type: select,
                          };
                        });
                      }}
                      title="نوع ویژگی"
                    />
                  </div>
                  {data.type === "selector" ? (
                    <div className="w-full flex flex-col justify-start items-center mb-3">
                      <InputAdder
                        placeholder=""
                        align_text={"start"}
                        disabled={false}
                        id={unID.input_value_type}
                        setValue={(inp_value) => {
                          setData((prevValue) => {
                            if (data.body.some((i)=>{
                              return i === inp_value
                            })) {
                              toast.error("این مقدار قبلا اضافه شده");
                              return prevValue;
                            }
                            if (prevValue.body.length >= 20) {
                              toast.error(
                                "نمیتوانید بیشتر از 13 آیتم وارد کنید"
                              );
                              return prevValue;
                            }
                            return {
                              ...prevValue,
                              body: [...prevValue.body, inp_value],
                            };
                          });
                        }}
                        title={"مقدار های ویژگی"}
                        name=""
                        value={data.title}
                      />
                    </div>
                  ) : data.type === "multiple_selection" ? (
                    <div className="w-full flex flex-col justify-start items-center mb-3">
                      <InputAdder
                        placeholder=""
                        align_text={"start"}
                        disabled={false}
                        id={unID.input_value_type}
                        setValue={(inp_value) => {
                          setData((prevValue) => {
                            if (data.body.some((i)=>{
                              return i === inp_value
                            })) {
                              toast.error("این مقدار قبلا اضافه شده");
                              return prevValue;
                            }
                            if (prevValue.body.length >= 20) {
                              toast.error(
                                "نمیتوانید بیشتر از 13 آیتم وارد کنید"
                              );
                              return prevValue;
                            }

                            return {
                              ...prevValue,
                              body: [...prevValue.body, inp_value],
                            };
                          });
                        }}
                        title={"مقدار های ویژگی"}
                        name=""
                        value={data.title}
                      />
                    </div>
                  ) : null}
                </div>
                {data.type !== "input" && data.type !== "" ? (
                  <>
                    <div className="bg-blue-900 text-white break-words p-3 mt-1 text-justify w-full min-h-[50px] relative">
                      <button
                        onClick={() => {
                          setData(() => ({
                            ...data,
                            body: [],
                          }));
                        }}
                        className="absolute left-0 top-[2.5px] p-[7px] rounded-md"
                      >
                        <FaRegTrashCan className="text-white bg-red-600 p-2 rounded-md w-[30px] h-[30px] shadow-ghost shadow-red-600" />
                      </button>
                      {data.body.map((i , index) => (
                        <div key={index}>
                          {"-"}
                          {i}
                          {"-"}
                        </div>
                      ))}
                    </div>
                  </>
                ) : null}
                {data.type !== "" ? (
                  <button
                    onClick={() => {
                      handleCreate();
                    }}
                    type="submit"
                    className="w-full px-3 py-2 bg-colorTheme text-white my-5 rounded-md"
                  >
                    اضافه کردن ویژگی
                  </button>
                ) : null}
              </form>
              <hr className="bg-gray-500 h-[1px] w-full border-none mx-auto my-5" />
              <h2 className="font-semibold text-textColorTheme text-2xl my-5 mt-10 w-full text-start">
                مشاهده ویژگی ها
              </h2>
              <div className="w-full flex flex-col justify-start items-start gap-3">
                {typeof properties === "object" ? (
                  properties ? (
                    properties[0] ? (
                      properties?.map((i , index) => (
                        <div key={index} className="flex flex-row justify-start items-center w-full p-5 pr-0 bg-backgroundColorTheme_2 relative rounded-md">
                          <span
                            className={`bg-colorTheme h-[70px] w-[5px] rounded-l-md`}
                          ></span>
                          <div className="flex xl:flex-row flex-col justify-between items-center mr-5 w-full">
                            <div className="flex sm:flex-row flex-col justify-start items-center gap-3">
                              <h2 className="text-textColorTheme font-semibold">
                                {i.title}
                              </h2>
                              <p
                                style={
                                  i.type === "input"
                                    ? { color: "#22c55e" }
                                    : i.type === "multiple_selection"
                                    ? { color: "#2563eb" }
                                    : { color: "#ff7300" }
                                }
                                className=""
                              >
                                {i.type}
                              </p>
                            </div>
                            <div className="flex sm:flex-row flex-col justify-end items-center gap-3">
                              <p className="flex flex-row-reverse justify-center items-center">
                                <div
                                  onClick={() => {
                                    route.push(
                                      `/admin_panel/categories/67af86a5f9c5f3aeccec5e2c/properties/${i._id}`
                                    );
                                  }}
                                  className="flex flex-row justify-center items-center gap-1 cursor-pointer"
                                >
                                  <TbEyeCode
                                    size={25}
                                    className="text-colorTheme"
                                  />
                                  <span>مشاهده مقادیر</span>
                                </div>
                              </p>
                              <span className="font-bold text-colorTheme text-lg max-sm:hidden">
                                |
                              </span>
                              <span className="font-bold text-colorTheme text-lg sm:hidden">
                                --
                              </span>
                              <div>{dateChanger(new Date(i.createdAt))}</div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <span className="w-full text-center text-red-500">
                        ویژگی برای این دسته بندی وجود ندارد
                      </span>
                    )
                  ) : null
                ) : null}
              </div>
            </div>
          </>
        )}
      </Counter_admin_panel>
    </section>
  );
}

export default Page;
