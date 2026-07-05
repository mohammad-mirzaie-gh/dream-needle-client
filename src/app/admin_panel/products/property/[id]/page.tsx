"use client";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import Counter_admin_panel from "../../../../../components/container/Container_user_panel";
import Title_panel_user from "../../../../../components/title/Title_panel_user";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import React from "react";
import Input from "@/components/input/Input";
import Selector from "@/components/selector/selector";
import MultiSelector from "@/components/selector/multiSelector";
import { get_all_property } from "@/redux/category/action";
import toast from "react-hot-toast";
import Loading from "@/components/loading/Loading";
import { Product_update_property } from "@/query_hook/products/useProduct";
import { get_one_product } from "@/redux/product/action";
import Editor from "@/components/editor/Editor";
export interface data_type {
  id: string;
  title: string;
  low_description: string;
  price: number;
  count_available: number;
  color: string[];
  size: string[];
  category: string;
}

function Page() {
  const router = useRouter();
  const id = useParams().id;
  const dispatch = useAppDispatch();
  const [data, setData] = useState<Record<string, string>>({});
  const [data_shower, setData_shower] = useState<string[]>([]);
  const [data_full_description, setData_full_description] =
    useState<string>("");
  const [data_count, setData_count] = useState<number | string>(0);

  const { mutate: mutate_update_product_property } = Product_update_property();

  const product = useAppSelector((state) => state.productSlice.product);
  const properties = useAppSelector((state) => state.categorySlice.properties);

  useEffect(() => {
    dispatch(get_one_product({ id: String(id) }));
  }, []);

  useEffect(() => {

    if (typeof product === "object" && product?.category) {
      dispatch(
        get_all_property({
          id: String(product?.category?._id || ""),
        })
      );
    }else{
      toast.error("تا وقتی دسته بندی نداشته باشه این تا صبح همین شکلی میچرخه")
    }
    setData_full_description(
      typeof product === "object" ? product?.full_description || "" : ""
    );
  }, [product]);

  useEffect(() => {
    const arr: string[] = [];
    for (const key in data) {
      arr.push(data[key]);
    }
    setData_shower(arr);
  }, [data]);

  useEffect(() => {
    if (typeof properties === "object" && properties && properties[0]) {
      const arr = [...properties];
      const initialData: Record<string, string> = {};

      arr?.forEach((i) => {
        initialData[i._id] = `${i.type === "input" ? `${i.title} : ` : ""}`;
      });
      setData(initialData);
    }
  }, [properties]);

  const update_property = async () => {
    let arr: string[] = [];
    for (const key in data) {
      if (!data[key]) {
        arr = [];
        break;
      } else {
        arr.push(data[key]);
      }
    }

    const new_data = {
      id: String(id),
      data: { properties: arr, full_description: data_full_description },
    };

    if (!arr[0]) {
      toast.error("لطفا مقادیر خواص خواسته شده را کامل وارد کنید");
    } else if (!data_full_description) {
      toast.error("توضیحات کامل را وارد کنید");
    } else if (Number(data_count) <= 20) {
      toast.error("تعداد کلمات شما نمیتواند کمتر از 20 تا باشد");
    } else {
      try {
        await toast.promise(
          new Promise((resolve, reject) => {
            mutate_update_product_property(new_data, {
              onSuccess: () => {
                resolve(data);
                router.push("/admin_panel/products");
              },
              onError: reject,
            });
          }),
          {
            loading: "در حال ذخیره محصول...",
            success: "محصول با موفقیت ذخیره شد",
          }
        );
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <section className="w-full py-5 lg:px-10 px-6">
      <Title_panel_user title="خواص و توضیحات" />
      <Counter_admin_panel
        sidContent={{
          title: "آموزش",
          section: "این قسمت صرفا برای به روزرسانی  اطلاعات خواص محصول است",
          spaner_content:
            "این بخش به صورت آزاد ساخته میشود و وابستگی ندارد و بعد از هربار ویرایش خواص قبلی شما پاک خواهد شد",
        }}
      >
        <div className="flex flex-col justify-start items-start w-full">
          {properties === "loading" ? (
            <div className="w-full flex justify-center items-center">
              <Loading />
            </div>
          ) : (
            <>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                }}
                className="w-full flex flex-col justify-center items-center"
              >
                <div className="w-full grid gap-6 mb-6 lg:grid-cols-2">
                  {typeof properties === "object" ? (
                    properties && properties[0] ? (
                      <>
                        {properties.map((i) => (
                          <div
                            key={i._id}
                            className="w-full flex flex-col justify-start items-center mb-3"
                          >
                            {i.type === "input" ? (
                              <Input
                                placeholder=""
                                align_text={"start"}
                                disabled={false}
                                id={i._id}
                                setValue={(e) => {
                                  setData((state) => {
                                    return {
                                      ...state,
                                      [i._id]: e.target.value,
                                    };
                                  });
                                }}
                                title={i.title}
                                name={i._id}
                                value={data[i._id] || ""}
                              />
                            ) : i.type === "selector" ? (
                              <Selector
                                value={data[i._id]}
                                data={i.body}
                                ChangeHandler={(e) => {
                                  setData((state) => {
                                    return {
                                      ...state,
                                      [i._id]: `${i.title} : ${e}`,
                                    };
                                  });
                                }}
                                title={i.title}
                              />
                            ) : i.type === "multiple_selection" ? (
                              <MultiSelector
                                data={i.body}
                                ChangeHandler={(data) => {
                                  setData((state) => {
                                    return {
                                      ...state,
                                      [i._id]: `${i.title} : ${data.join(",")}`,
                                    };
                                  });
                                }}
                                title={i.title}
                              />
                            ) : null}
                          </div>
                        ))}
                      </>
                    ) : (
                      <span className="w-full text-red-600">
                        خواصی برای این دسته بندی وجود ندارد
                      </span>
                    )
                  ) : null}
                </div>
                <hr className="w-full bg-slate-400 my-5" />
                <div className="w-full flex flex-col justify-center items-center">
                  <div className="w-full">
                    <Editor
                      onChange={(data) => {
                        setData_full_description(data);
                      }}
                      label="توضیحات کامل محصول"
                      data={data_full_description || ""}
                      setCountWords={(count) => {
                        setData_count(count);
                      }}
                    />
                  </div>
                </div>
                <div className="flex flex-col justify-around items-center w-full gap-2">
                  <div className="w-full p-5">
                    <p className="w-full flex flex-col justify-start items-start gap-3">
                      {data_shower?.map((i, index) => (
                        <div key={index}>{i}</div>
                      ))}
                    </p>
                  </div>
                  <button
                    onClick={update_property}
                    className="py-2 px-3 rounded-md bg-colorTheme w-full mx-auto text-white mt-5"
                  >
                    به روزرسانی محصول
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
      </Counter_admin_panel>
    </section>
  );
}

export default Page;
