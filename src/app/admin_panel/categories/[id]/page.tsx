"use client";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  create_category,
  delete_category,
  edit_one_category,
  get_one_category,
} from "@/redux/category/action";
import React, { useEffect, useId, useState } from "react";
import Counter_admin_panel from "../../../../components/container/Container_user_panel";
import Title_panel_user from "../../../../components/title/Title_panel_user";
import Loading from "../../../../components/loading/Loading";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Input from "@/components/input/Input";
import { is_closer, is_opener } from "@/redux/modalSlice/modalSlice";
import { useModalHandlers } from "@/redux/Context_provider";
import Image from "next/image";

interface ApiResponse {
  message: string;
}

function Page() {
  const category = useAppSelector((state) => state.categorySlice.category);
  const [data, setData] = useState({
    title: "",
    description: "",
    title_new: "",
    description_new: "",
    is_original: false,
    is_original_new: false,
    image: {},
    image_new: {},
  });
  const { setTrueHandler } = useModalHandlers();
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  const params = useParams().id;
  const route = useRouter();

  useEffect(() => {
    if (typeof params === "string") {
      dispatch(get_one_category({ id: params }));
    } else {
      toast.error("خطای داخلی");
      route.push("/admin_panel/category");
    }
  }, []);
  useEffect(() => {
    if (typeof category === "object") {
      setData({
        title: category?.title || "",
        description: category?.description || "",
        description_new: "",
        title_new: "",
        is_original: category?.is_original || false,
        is_original_new: false,
        image: {},
        image_new: {},
      });
    }
  }, [category]);
  useEffect(() => {
  }, [data.image_new]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    setSelectedValues((prev) =>
      isChecked ? [...prev, value] : prev.filter((v) => v !== value)
    );
  };

  const dataChanger = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const unID = {
    inputTitle: useId(),
    inputDescription: useId(),
  };

  const handle_delete_category = () => {
    dispatch(
      is_opener({
        title: "حذف دسته بندی محصول",
        type: "warn",
        section:
          "در صورتی که دسته بندی مورد نظر رو حذف کنید تمام دسته بندی های وابسته زیرین حذف خواهند شد",
        is_open: true,
      })
    );
  };

  const handleTrueAction = async () => {
    try {
      const result = (await dispatch(
        delete_category({ id: String(params) })
      )) as { payload: ApiResponse };
      if (delete_category.fulfilled.match(result)) {
        toast.success(result.payload.message);
        route.push("/admin_panel/categories");
      } else {
        toast.error(result?.payload?.message);
      }
      dispatch(is_closer());
    } catch (err) {
      console.error(err);
    }
  };

  const update_category = async () => {
    if (data.title && data.description) {
      if (data.image) {
        try {
          const result = (await dispatch(
            edit_one_category({
              id: String(params),
              data: {
                title: data.title,
                description: data.description,
                is_original: data.is_original,
                image: data.image as File,
              },
            })
          )) as { payload: ApiResponse };
          if (edit_one_category.fulfilled.match(result)) {
            toast.success("دسته بندی شما با موفقیت به روزرسانی شد");
            route.push("/admin_panel/categories");
          } else {
            toast.error(result?.payload?.message);
          }
        } catch (err) {
          console.error(err);
        }
      } else {
        toast.error("بروزرسانی دسته بندی نیاز به عکس دارد");
      }
    } else {
      toast.error("لطفا برای  نام و توضیحات دسته بندی مقدار معتبر وارد کنید");
    }
  };

  useEffect(() => {
    setTrueHandler(() => handleTrueAction);
  }, [setTrueHandler]);

  const create_category_func = async () => {
    if (data.title_new && data.description_new) {
      if (selectedValues[0]) {
        try {
          const result = (await dispatch(
            create_category({
              data: {
                title: data.title_new,
                description: data.description_new,
                category_parent: String(params),
                type: selectedValues,
                is_original: data.is_original_new,
                image: data.image_new as File,
              },
            })
          )) as { payload: ApiResponse };
          if (create_category.fulfilled.match(result)) {
            toast.success("دسته بندی شما با موفقیت به روزرسانی شد");
            route.push("/admin_panel/categories");
          } else {
            toast.error(result?.payload?.message);
          }
        } catch (err) {
          console.error(err);
        }
      } else {
        toast.error(
          "لطفا یکی از تایپ هارا انتخایب کنید دسته بندی مقدار معتبر وارد کنید"
        );
      }
    } else {
      toast.error("لطفا برای  نام و توضیحات دسته بندی مقدار معتبر وارد کنید");
    }
  };

  return (
    <section className="w-full py-5 lg:px-10 px-6">
      <Title_panel_user title="اطلاعات دسته بندی" />
      <Counter_admin_panel
        sidContent={{
          title: "اخطار !!!",
          section:
            "توی این قسمت میتونید با فقط نام و توضیحات دسته بندی رو به روزرسانی کنید",
          spaner_content:
            "دسته بندی ک حذف بشه تمام دسته بندی های زیر مجموعه پاک خواهند شد",
        }}
      >
        {category === "loading" ? (
          <div className="flex flex-row justify-center items-center">
            <Loading />
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-8 w-full">
              <div>
                <div className="flex lg:flex-row flex-col justify-between items-center">
                  <h1 className="text-colorTheme text-3xl font-bold">
                    {category?.title}
                  </h1>
                  <div className="flex gap-3">
                    <button
                      onClick={handle_delete_category}
                      className="bg-red-500 lg:py-1 text-white py-2 lg:px-3 px-1 my-3 rounded-md"
                    >
                      حذف دسته بندی
                    </button>
                    <button
                      onClick={() => {
                        route.push(
                          `/admin_panel/categories/${params}/properties`
                        );
                      }}
                      className="bg-colorTheme lg:py-1 text-white py-2 lg:px-3 px-1 my-3 rounded-md"
                    >
                      اضافه کردن ویژگی
                    </button>
                  </div>
                </div>
                <p className="mt-2">
                  ساخته شده برای استفاده در :{" "}
                  {category?.type.map((i, index) => (
                    <p key={index} className="text-green-500 inline-block mx-1">
                      ({i})
                    </p>
                  ))}
                </p>
              </div>
              <div>
                {category?.image ? (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_URL}/uploads/categories${category?.image}`}
                    alt="Category Image"
                    width={150}
                    height={150}
                  />
                ) : (
                  <span className="w-full text-start text-rose-600">
                    عکسی برای این دسته بندی وجود ندارد
                  </span>
                )}
              </div>
              <div>
                <h2 className="font-medium">توضیحات دسته بندی : </h2>
                <p className="bg-blue-900 text-white p-3 mt-1">
                  {category?.description}
                </p>
              </div>
              <hr className="bg-gray-500 h-[1px] w-full border-none mx-auto" />
              <div>
                <h2 className="text-3xl mb-5 font-semibold">ویرایش اطلاعات</h2>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                  className="w-full flex flex-col justify-start items-start"
                >
                  <div className="w-full flex flex-col justify-start items-center mb-3">
                    <Input
                      placeholder="نام دسته بندی"
                      align_text={"start"}
                      disabled={false}
                      id={unID.inputTitle}
                      setValue={dataChanger}
                      title={""}
                      name="title"
                      value={data.title}
                    />
                  </div>
                  <div className="w-full flex flex-col justify-start items-center mb-3">
                    <textarea
                      placeholder="توضیحات دسته بندی"
                      className="outline-none min-h-[200px] w-full font-bold rounded-lg bg-backgroundColorTheme_2 shadow-inputing text-textColorTheme transition-all duration-300 py-[10px] px-3 focus:shadow-colorTheme"
                      disabled={false}
                      id={unID.inputDescription}
                      onChange={(e) =>
                        setData((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                      title={"توضیحات دسته بندی"}
                      name="description"
                      value={data.description}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl my-2">
                      سطح دسته بندی
                    </h3>
                    <label className="flex gap-3 items-center space-x-2">
                      <input
                        type="checkbox"
                        className="mr-2"
                        checked={data?.is_original || false}
                        onChange={(e) => {
                          setData(() => {
                            return { ...data, is_original: e.target.checked };
                          });
                        }}
                      />
                      <span>دسته بندی اصلی</span>
                    </label>
                  </div>
                  <div>
                    <input
                      type="file"
                      className="my-5"
                      onChange={(e) => {
                        if (e.target?.files) {
                          setData(() => {
                            return { ...data, image: e.target?.files![0] };
                          });
                        } else {
                          toast.error("خطای داخلی");
                        }
                      }}
                      id=""
                    />
                  </div>
                  <button
                    onClick={update_category}
                    className="bg-colorTheme w-full py-2 px-3 rounded-md mt-5"
                  >
                    به روزرسانی دسته بندی
                  </button>
                </form>
              </div>
              <hr className="bg-gray-500 h-[1px] w-full border-none mx-auto" />
              <div className="">
                <h2 className="text-3xl mb-5 font-semibold">
                  اضافه کردن زیرمجموعه
                </h2>
                <div className="w-full flex flex-col justify-start items-center mb-3">
                  <Input
                    placeholder="نام دسته بندی"
                    align_text={"start"}
                    disabled={false}
                    id={unID.inputTitle}
                    setValue={dataChanger}
                    title={""}
                    name="title_new"
                    value={data.title_new}
                  />
                </div>
                <div className="w-full flex flex-col justify-start items-center mb-3">
                  <textarea
                    placeholder="توضیحات دسته بندی"
                    className="outline-none min-h-[200px] w-full font-bold rounded-lg bg-backgroundColorTheme_2 shadow-inputing text-textColorTheme transition-all duration-300 py-[10px] px-3 focus:shadow-colorTheme"
                    disabled={false}
                    id={unID.inputDescription}
                    onChange={(e) =>
                      setData((prev) => ({
                        ...prev,
                        description_new: e.target.value,
                      }))
                    }
                    title={"توضیحات دسته بندی"}
                    name="description_new"
                    value={data.description_new}
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-xl my-2">
                    مجاز در استفاده در
                  </h3>
                  <label className="flex gap-3 items-center space-x-2">
                    <input
                      type="checkbox"
                      name="category"
                      value="blog"
                      className="mr-2"
                      onChange={handleChange}
                    />
                    <span>مقالات</span>
                  </label>
                  <label className="flex gap-3 items-center space-x-2">
                    <input
                      type="checkbox"
                      name="category"
                      value="product"
                      className="mr-2"
                      onChange={handleChange}
                    />
                    <span>محصول</span>
                  </label>
                  <label className="flex gap-3 items-center space-x-2">
                    <input
                      type="checkbox"
                      name="category"
                      value="training"
                      className="mr-2"
                      onChange={handleChange}
                    />
                    <span>آموزش</span>
                  </label>
                </div>{" "}
                <div>
                  <h3 className="font-semibold text-xl my-2">سطح دسته بندی</h3>
                  <label className="flex gap-3 items-center space-x-2">
                    <input
                      type="checkbox"
                      className="mr-2"
                      onChange={(e) => {
                        setData(() => {
                          return { ...data, is_original_new: e.target.checked };
                        });
                      }}
                    />
                    <span>دسته بندی اصلی</span>
                  </label>
                </div>
                <div>
                  <input
                    type="file"
                    className="my-5"
                    onChange={(e) => {
                      if (e.target?.files) {
                        setData(() => {
                          return { ...data, image_new: e.target?.files![0] };
                        });
                      } else {
                        toast.error("خطای داخلی");
                      }
                    }}
                    id=""
                  />
                </div>
                <button
                  onClick={create_category_func}
                  className="bg-colorTheme w-full py-2 px-3 rounded-md mt-5"
                >
                  به روزرسانی دسته بندی
                </button>
              </div>
            </div>
          </>
        )}
      </Counter_admin_panel>
    </section>
  );
}

export default Page;
