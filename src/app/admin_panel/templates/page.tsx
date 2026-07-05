"use client";
import { useAppSelector } from "@/redux/store";
import React, { useEffect, useId, useState } from "react";
import Counter_admin_panel from "./../../../components/container/Container_user_panel";
import Title_panel_user from "./../../../components/title/Title_panel_user";
import Loading from "./../../../components/loading/Loading";
import Input from "@/components/input/Input";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { instance_by_auth } from "@/configs/axios_config";
import { useDispatch } from "react-redux";
import { set_colors, set_sizes } from "@/redux/templateSlice/templatesSlice";
import { dateChanger } from "@/utils/functions/dateChange/dateChange";
import { AxiosError } from "axios";
import { FaRegTrashAlt } from "react-icons/fa";
import { GrClose } from "react-icons/gr";
import { BiPencil } from "react-icons/bi";

const queryKey_color = ["color"];
const queryKey_size = ["size"];

function Page() {
  const [color, setColor] = useState({
    title: "",
    english_title: "",
    color_code: "",
  });
  const [size, setSize] = useState({
    title: "",
    english_title: "",
    size: "",
  });

  const [color_edit, setColor_edit] = useState<{
    _id?: string;
    title: string;
    english_title: string;
    color_code: string;
  }>({
    _id: "",
    title: "",
    english_title: "",
    color_code: "",
  });
  const [size_edit, setSize_edit] = useState<{
    _id?: string;
    title: string;
    english_title: string;
    size: string;
  }>({
    _id: "",
    title: "",
    english_title: "",
    size: "",
  });

  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const colors = useAppSelector((state) => state.templateSlice.colors);
  const sizes = useAppSelector((state) => state.templateSlice.sizes);
  const get_color = useQuery({
    queryKey: queryKey_color,
    queryFn: async () => {
      const colors = await instance_by_auth.get("colors");
      return colors.data;
    },
  });
  const get_size = useQuery({
    queryKey: queryKey_size,
    queryFn: async () => {
      const sizes = await instance_by_auth.get("sizes");
      return sizes.data;
    },
  });

  const createColor = useMutation({
    mutationFn: async (data: {
      title: string;
      english_title: string;
      color_code: string;
    }) => {
      const response = await instance_by_auth.post("colors", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKey_color });
      toast.success("رنگ جدید با موفقیت اضافه شد");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data?.message || "خطای نامشخص");
    },
  });
  const createSize = useMutation({
    mutationFn: async (data: {
      title: string;
      english_title: string;
      size: string;
    }) => {
      const response = await instance_by_auth.post("sizes", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKey_size });
      toast.success("سایز جدید با موفقیت اضافه شد");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data?.message || "خطای نامشخص");
    },
  });
  const deleteColor = useMutation({
    mutationFn: async (data: { id: string }) => {
      const response = await instance_by_auth.delete(`colors/${data.id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKey_color });
      toast.success("رنگ جدید با موفقیت حذف شد");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data?.message || "خطای نامشخص");
    },
  });
  const deleteSize = useMutation({
    mutationFn: async (data: { id: string }) => {
      const response = await instance_by_auth.delete(`sizes/${data.id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKey_size });
      toast.success("سایز جدید با موفقیت حذف شد");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data?.message || "خطای نامشخص");
    },
  });
  const updateColor = useMutation({
    mutationFn: async (data: { id: string; data: {} }) => {
      const response = await instance_by_auth.put(
        `colors/${data.id}`,
        data.data
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKey_color });
      toast.success("رنگ جدید با موفقیت ویرایش شد");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data?.message || "خطای نامشخص");
    },
  });
  const updateSize = useMutation({
    mutationFn: async (data: { id: string; data: {} }) => {
      const response = await instance_by_auth.put(
        `sizes/${data.id}`,
        data.data
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKey_size });
      toast.success("سایز جدید با موفقیت ویرایش شد");
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data?.message || "خطای نامشخص");
    },
  });

  const [templates, setTemplates] = useState<string>("color");

  useEffect(() => {
    if (get_color.isSuccess && get_color.data) {
      dispatch(set_colors(get_color.data));
    }
  }, [get_color.isSuccess, get_color.data]);

  useEffect(() => {
    if (get_size.isSuccess && get_size.data) {
      dispatch(set_sizes(get_size.data));
    }
  }, [get_size.isSuccess, get_size.data]);

  const unID = {
    emailInput: useId(),
    code_emailInput: useId(),
  };

  const colorChanger = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setColor((state) => ({
      ...state,
      [name]: value,
    }));
  };
  const sizeChanger = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSize((state) => ({
      ...state,
      [name]: value,
    }));
  };
  const colorChanger_edit = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setColor_edit((state) => ({
      ...state,
      [name]: value,
    }));
  };
  const sizeChanger_edit = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSize_edit((state) => ({
      ...state,
      [name]: value,
    }));
  };

  return (
    <>
      {color_edit.color_code ? (
        <div className="fixed w-full h-full flex flex-row justify-center items-start top-0 left-0 backdrop-blur-[5px] z-30">
          <form
            className="w-[310px] relative p-5 rounded-md bg-backgroundColorTheme_1 shadow-ghost mt-5"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="w-full flex flex-col gap-6 mb-6 ">
              <GrClose
                size={25}
                color="red"
                className="cursor-pointer"
                onClick={() => {
                  setColor_edit(() => {
                    return { ...color_edit, color_code: "" };
                  });
                }}
              />
              <div className="w-full flex flex-col justify-start items-center mb-3">
                <Input
                  placeholder=""
                  align_text={"start"}
                  disabled={false}
                  id={unID.emailInput}
                  setValue={colorChanger_edit}
                  title={"نام"}
                  name="title"
                  value={color_edit.title}
                />
              </div>
              <div className="w-full flex flex-col justify-start items-center mb-3">
                <Input
                  placeholder=""
                  align_text={"start"}
                  disabled={false}
                  id={unID.code_emailInput}
                  setValue={colorChanger_edit}
                  title={"نام انگلیسی"}
                  name="english_title"
                  value={color_edit.english_title}
                />
              </div>
              <div className="w-full flex flex-col justify-start items-center mb-3">
                <Input
                  placeholder=""
                  align_text={"start"}
                  disabled={true}
                  id={unID.code_emailInput}
                  setValue={colorChanger_edit}
                  title={"کد رنگ"}
                  name="color_code"
                  value={color_edit.color_code}
                />
              </div>
              <div className="flex flex-row justify-between items-center gap-4 p-4 border rounded-2xl shadow-md w-52">
                <label className="text-lg font-semibold">انتخاب رنگ</label>
                <div
                  className="relative w-16 h-16 rounded-full border-2 shadow-inner"
                  style={{ backgroundColor: color_edit.color_code }}
                ></div>
                <input
                  type="color"
                  value={color.color_code}
                  onChange={(e) =>
                    setColor_edit(() => {
                      return { ...color_edit, color_code: e.target.value };
                    })
                  }
                  className="w-10 h-10 cursor-pointer opacity-0 absolute"
                />
              </div>
            </div>
            <button
              className="w-full py-2 px-3 rounded-md bg-colorTheme"
              onClick={() => {
                updateColor.mutate({
                  id: color_edit._id || "",
                  data: color_edit,
                });
              }}
            >
              به روزرسانی قالب
            </button>
          </form>
        </div>
      ) : null}
      {size_edit.size ? (
        <div className="fixed w-full h-full flex flex-row justify-center items-start top-0 left-0 backdrop-blur-[5px] z-30">
          <form
            className="w-[310px] relative p-5 rounded-md bg-backgroundColorTheme_1 shadow-ghost mt-5"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="w-full flex flex-col gap-6 mb-6">
              <GrClose
                size={25}
                color="red"
                className="cursor-pointer"
                onClick={() => {
                  setSize_edit(() => {
                    return { ...size_edit, size: "" };
                  });
                }}
              />
              <div className="w-full flex flex-col justify-start items-center mb-3">
                <Input
                  placeholder=""
                  align_text={"start"}
                  disabled={false}
                  id={unID.emailInput}
                  setValue={sizeChanger_edit}
                  title={"نام"}
                  name="title"
                  value={size_edit.title}
                />
              </div>
              <div className="w-full flex flex-col justify-start items-center mb-3">
                <Input
                  placeholder=""
                  align_text={"start"}
                  disabled={false}
                  id={unID.code_emailInput}
                  setValue={sizeChanger_edit}
                  title={"نام انگلیسی"}
                  name="english_title"
                  value={size_edit.english_title}
                />
              </div>
              <div className="w-full flex flex-col justify-start items-center mb-3">
                <Input
                  placeholder=""
                  align_text={"start"}
                  disabled={false}
                  id={unID.code_emailInput}
                  setValue={sizeChanger_edit}
                  title={"اندازه سایز"}
                  name="size"
                  value={size_edit.size}
                />
              </div>
            </div>
            <button
              className="w-full py-2 px-3 rounded-md bg-colorTheme"
              onClick={() => {
                updateSize.mutate({ id: size_edit._id || "", data: size_edit });
              }}
            >
              به روزرسانی قالب
            </button>
          </form>
        </div>
      ) : null}
      <section className="w-full py-5 lg:px-10 px-6">
        <Title_panel_user title="قالب ها" />
        <Counter_admin_panel
          sidContent={{
            title: "راهنمایی",
            section:
              "اینجا میتونی قالب های مختلف برای استفاده در ساخت محصول رو بکار ببری",
            spaner_content: "این کار برای جستجو کاربر خیلی کمک میکنه",
          }}
        >
          <div className="flex flex-col justify-center items-center w-full gap-4">
            <div className="w-full flex justify-start items-center flex-row">
              <button
                onClick={() => {
                  setTemplates("color");
                }}
                className="duration-300 transition-all px-3 py-2 font-medium text-2xl font-lalezarFont border-b-[1px] border-colorTheme focus:text-colorTheme active:text-colorTheme"
                style={{ color: templates === "color" ? "#2563eb" : "" }}
              >
                رنگ ها
              </button>
              <button
                onClick={() => {
                  setTemplates("size");
                }}
                className="duration-300 transition-all px-3 py-2 font-medium text-2xl font-lalezarFont border-b-[1px] border-colorTheme focus:text-colorTheme active:text-colorTheme"
              >
                سایز ها
              </button>
            </div>
            <div className="w-full">
              {templates === "color" ? (
                !get_color.isLoading ? (
                  <>
                    <form
                      className="w-full relative"
                      onSubmit={(e) => {
                        e.preventDefault();
                      }}
                    >
                      <div className="w-full grid gap-6 mb-6 lg:grid-cols-2">
                        <div className="w-full flex flex-col justify-start items-center mb-3">
                          <Input
                            placeholder=""
                            align_text={"start"}
                            disabled={false}
                            id={unID.emailInput}
                            setValue={colorChanger}
                            title={"نام"}
                            name="title"
                            value={color.title}
                          />
                        </div>
                        <div className="w-full flex flex-col justify-start items-center mb-3">
                          <Input
                            placeholder=""
                            align_text={"start"}
                            disabled={false}
                            id={unID.code_emailInput}
                            setValue={colorChanger}
                            title={"نام انگلیسی"}
                            name="english_title"
                            value={color.english_title}
                          />
                        </div>
                        <div className="w-full flex flex-col justify-start items-center mb-3">
                          <Input
                            placeholder=""
                            align_text={"start"}
                            disabled={true}
                            id={unID.code_emailInput}
                            setValue={colorChanger}
                            title={"کد رنگ"}
                            name="color_code"
                            value={color.color_code}
                          />
                        </div>
                        <div className="flex flex-row justify-between items-center gap-4 p-4 border rounded-2xl shadow-md w-52">
                          <label className="text-lg font-semibold">
                            انتخاب رنگ
                          </label>
                          <div
                            className="relative w-16 h-16 rounded-full border-2 shadow-inner"
                            style={{ backgroundColor: color.color_code }}
                          ></div>
                          <input
                            type="color"
                            value={color.color_code}
                            onChange={(e) =>
                              setColor(() => {
                                return { ...color, color_code: e.target.value };
                              })
                            }
                            className="w-10 h-10 cursor-pointer opacity-0 absolute"
                          />
                        </div>
                      </div>
                      <button
                        className="w-full py-2 px-3 rounded-md bg-colorTheme"
                        onClick={() => {
                          createColor.mutate(color);
                        }}
                      >
                        ساخت قالب رنگ جدید
                      </button>
                    </form>
                    <hr className="bg-gray-500 h-[1px] w-full border-none mx-auto my-5" />

                    {colors[0] ? (
                      colors.map((i, index) => (
                        <div
                          key={index}
                          className="flex flex-row justify-start items-center w-full p-5 pr-0 bg-backgroundColorTheme_2 relative rounded-md my-4"
                        >
                          <span
                            style={{ backgroundColor: i.color_code }}
                            className={`h-[70px] w-[5px] rounded-l-md`}
                          ></span>
                          <div className="flex xl:flex-row flex-col justify-between items-center mr-5 w-full">
                            <div className="flex sm:flex-row flex-col justify-start items-center gap-3">
                              <h2 className="text-textColorTheme font-semibold">
                                {i.title}
                              </h2>
                            </div>
                            <div className="flex sm:flex-row flex-col justify-start items-center gap-3">
                              <h2 className="text-textColorTheme font-semibold">
                                {i.english_title}
                              </h2>
                            </div>
                            <div className="flex sm:flex-row flex-col justify-end items-center max-sm:gap-3 gap-1 max-sm:mt-7">
                              <div
                                onClick={() => {
                                  deleteColor.mutate({ id: i._id });
                                }}
                                className="flex flex-row-reverse justify-center items-center cursor-pointer"
                              >
                                <FaRegTrashAlt
                                  size={20}
                                  className="-mt-[6px]"
                                  color="red"
                                />
                              </div>
                              <span className="font-bold text-colorTheme text-lg max-sm:hidden">
                                |
                              </span>
                              <span className="font-bold text-colorTheme text-lg sm:hidden">
                                --
                              </span>
                              <p className="flex flex-row-reverse justify-center items-center">
                                <div
                                  onClick={() => {
                                    setColor_edit(i);
                                  }}
                                  className="flex flex-row justify-center items-center gap-1 cursor-pointer"
                                >
                                  <BiPencil
                                    size={25}
                                    className="text-colorTheme"
                                  />
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
                      <span className="text-red-600">قالبی وجود ندارد</span>
                    )}
                  </>
                ) : (
                  <div className="flex flex-row justify-center items-center my-4">
                    <Loading />
                  </div>
                )
              ) : !get_size.isLoading ? (
                <>
                  <form
                    className="w-full relative"
                    onSubmit={(e) => {
                      e.preventDefault();
                    }}
                  >
                    <div className="w-full grid gap-6 mb-6 lg:grid-cols-2">
                      <div className="w-full flex flex-col justify-start items-center mb-3">
                        <Input
                          placeholder=""
                          align_text={"start"}
                          disabled={false}
                          id={unID.emailInput}
                          setValue={sizeChanger}
                          title={"نام"}
                          name="title"
                          value={size.title}
                        />
                      </div>
                      <div className="w-full flex flex-col justify-start items-center mb-3">
                        <Input
                          placeholder=""
                          align_text={"start"}
                          disabled={false}
                          id={unID.code_emailInput}
                          setValue={sizeChanger}
                          title={"نام انگلیسی"}
                          name="english_title"
                          value={size.english_title}
                        />
                      </div>
                      <div className="w-full flex flex-col justify-start items-center mb-3">
                        <Input
                          placeholder=""
                          align_text={"start"}
                          disabled={false}
                          id={unID.code_emailInput}
                          setValue={sizeChanger}
                          title={"اندازه سایز"}
                          name="size"
                          value={size.size}
                        />
                      </div>
                    </div>
                    <button
                      className="w-full py-2 px-3 rounded-md bg-colorTheme"
                      onClick={() => {
                        createSize.mutate(size);
                      }}
                    >
                      ساخت قالب سایز جدید
                    </button>
                  </form>
                  <hr className="bg-gray-500 h-[1px] w-full border-none mx-auto my-5" />

                  {sizes[0] ? (
                    sizes.map((i, index) => (
                      <div
                        key={index}
                        className="flex flex-row justify-start items-center w-full p-5 pr-0 bg-backgroundColorTheme_2 relative rounded-md my-4"
                      >
                        <span
                          className={`h-[70px] w-[5px] bg-colorTheme rounded-l-md`}
                        ></span>
                        <div className="flex xl:flex-row flex-col justify-between items-center mr-5 w-full">
                          <div className="flex sm:flex-row flex-col justify-start items-center gap-3">
                            <h2 className="text-textColorTheme font-semibold">
                              {i.title}
                            </h2>
                          </div>
                          <div className="flex sm:flex-row flex-col justify-start items-center gap-3">
                            <h2 className="text-textColorTheme font-semibold">
                              {i.english_title}
                            </h2>
                          </div>
                          <div className="flex sm:flex-row flex-col justify-start items-center gap-3">
                            <h2 className="text-textColorTheme font-semibold">
                              {i.size}
                            </h2>
                          </div>
                          <div className="flex sm:flex-row flex-col justify-end items-center max-sm:gap-3 gap-1 max-sm:mt-7">
                            <div
                              onClick={() => {
                                deleteSize.mutate({ id: i._id });
                              }}
                              className="flex flex-row-reverse justify-center items-center cursor-pointer"
                            >
                              <FaRegTrashAlt
                                size={20}
                                className="-mt-[6px]"
                                color="red"
                              />
                            </div>
                            <span className="font-bold text-colorTheme text-lg max-sm:hidden">
                              |
                            </span>
                            <span className="font-bold text-colorTheme text-lg sm:hidden">
                              --
                            </span>
                            <p className="flex flex-row-reverse justify-center items-center">
                              <div
                                onClick={() => {
                                  setSize_edit(i);
                                }}
                                className="flex flex-row justify-center items-center gap-1 cursor-pointer"
                              >
                                <BiPencil
                                  size={25}
                                  className="text-colorTheme"
                                />
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
                    <span className="text-red-600">قالبی وجود ندارد</span>
                  )}
                </>
              ) : (
                <div className="flex flex-row justify-center items-center my-4">
                  <Loading />
                </div>
              )}
            </div>
          </div>
        </Counter_admin_panel>
      </section>
    </>
  );
}

export default Page;
