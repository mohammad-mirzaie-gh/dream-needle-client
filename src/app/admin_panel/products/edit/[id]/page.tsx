"use client";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import Counter_admin_panel from "../../../../../components/container/Container_user_panel";
import Title_panel_user from "../../../../../components/title/Title_panel_user";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useId, useState } from "react";
import React from "react";
import Input from "@/components/input/Input";
import MultiSelector from "@/components/selector/multiSelector";
import size_get_all from "@/query_hook/sizes/useSize";
import color_get_all from "@/query_hook/colors/useColor";
import toast from "react-hot-toast";
import { Product_update } from "@/query_hook/products/useProduct";
import { get_one_product } from "@/redux/product/action";

export interface data_type {
  id: string;
  title: string;
  low_description: string;
  price: number;
  color: string[];
  size: string[];
  category: string;
}

function Page() {
  const router = useRouter();
  const id = useParams().id;
  const [data, setData] = useState<data_type>({
    id: "",
    title: "",
    low_description: "",
    category: "",
    price: 0,
    color: [],
    size: [],
  });

  const dispatch = useAppDispatch();
  const { mutate: mutate_sizes } = size_get_all();
  const { mutate: mutate_colors } = color_get_all();
  const { mutate: mutate_update_product } = Product_update();

  const product = useAppSelector((state) => state.productSlice.product);

  useEffect(() => {
    if (typeof product === "object") {
      const obj = {
        id: product?._id || "",
        title: product?.title || "",
        category: product?.category?._id || "",
        price: product?.price || 0,
        low_description: product?.low_description || "",
        color:
          product?.color.map((i) => {
            return i._id;
          }) || [],
        size:
          product?.size.map((i) => {
            return i._id;
          }) || [],
      };
      setData(obj);
    }
  }, [product]);

  useEffect(() => {
    mutate_sizes();
    mutate_colors();
    dispatch(get_one_product({ id: String(id) }));
  }, []);

  const sizes = useAppSelector((state) => state.templateSlice.sizes);
  const colors = useAppSelector((state) => state.templateSlice.colors);

  const data_to_string = (data: { title: string }[]) => {
    if (Array.isArray(data) && data[0]) {
      return data.map((i) => {
        return i.title;
      });
    }
    return [];
  };

  const unID = {
    titleInput: useId(),
    categoryInput: useId(),
    low_descriptionInput: useId(),
    priceInput: useId(),
    count_availableInput: useId(),
    colorInput: useId(),
    sizeInput: useId(),
  };

  const dataChanger = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const edit_product = async () => {
    if (data.price <= 9999) {
      toast.error("قیمت نمیتواند کمتر از 10000 تومان باشد");
    } else {
      try {
        await toast.promise(
          new Promise((resolve, reject) => {
            mutate_update_product(data, {
              onSuccess: (data) => {
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
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <section className="w-full py-5 lg:px-10 px-6">
      <Title_panel_user title="ویرایش محصول" />
      <Counter_admin_panel
        sidContent={{
          title: "آموزش",
          section: "این قسمت صرفا برای به روزرسانی  اطلاعات اولیه محصول است",
          spaner_content: "به هیچ عنوان نام محصول را تکراری وارد نکنید",
        }}
      >
        <div className="flex flex-col justify-start items-start w-full">
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className="w-full flex flex-col justify-center items-center"
          >
            <div className="w-full grid gap-6 mb-6 lg:grid-cols-2">
              <div className="w-full flex flex-col justify-start items-center mb-3">
                <Input
                  placeholder="بافت"
                  align_text={"start"}
                  disabled={false}
                  id={unID.titleInput}
                  setValue={dataChanger}
                  title={"نام محصول"}
                  name="title"
                  value={data.title}
                />
              </div>
              <div className="w-full flex flex-col justify-start items-center mb-3">
                <Input
                  placeholder="این یک محصول بافت است"
                  align_text={"start"}
                  disabled={false}
                  id={unID.low_descriptionInput}
                  setValue={dataChanger}
                  title={"توضیحات کوتاه"}
                  name="low_description"
                  value={data.low_description}
                />
              </div>
              <div className="w-full flex flex-col justify-start items-center mb-3">
                <Input
                  placeholder="عدد صحیح"
                  align_text={"start"}
                  disabled={false}
                  id={unID.priceInput}
                  setValue={dataChanger}
                  title={"قیمت محصول"}
                  name="price"
                  value={data.price}
                  type="number"
                />
              </div>
            </div>
            <div className="w-full grid gap-6 mb-6 lg:grid-cols-2">
              <div className="w-full flex flex-col justify-start items-center mb-3">
                <MultiSelector
                  data={
                    data_to_string(Array.isArray(colors) ? colors : []) || []
                  }
                  ChangeHandler={(data) => {
                    const colos__id_arr = data.map((i) => {
                      return colors.find((i2) => {
                        return i2.title === i;
                      })?._id;
                    });
                    setData((prevData) => ({
                      ...prevData,
                      color: colos__id_arr as string[],
                    }));
                  }}
                  title="رنگ های محصول"
                />
                <div className="w-full flex flex-row justify-start items-start flex-wrap px-2">
                  {typeof product === "object"
                    ? product?.color.map((i, index) => (
                        <div
                          key={index}
                          style={{ backgroundColor: i.color_code }}
                          className="rounded-[50%] w-7 h-7 px-2 my-2 mx-1"
                        ></div>
                      ))
                    : null}
                </div>
              </div>
              <div className="w-full flex flex-col justify-start items-center mb-3">
                <MultiSelector
                  data={data_to_string(Array.isArray(sizes) ? sizes : []) || []}
                  ChangeHandler={(data) => {
                    const sizes__id_arr = data.map((i) => {
                      return sizes.find((i2) => {
                        return i2.title === i;
                      })?._id;
                    });
                    setData((prevData) => ({
                      ...prevData,
                      size: sizes__id_arr as string[],
                    }));
                  }}
                  title="سایز های محصول"
                />
                <div className="w-full flex flex-row justify-start items-start flex-wrap px-2">
                  {typeof product === "object"
                    ? product?.size.map((i, index) => (
                        <div
                          key={index}
                          className="p-2 py-1 text-textColorTheme my-2 bg-colorTheme mx-2"
                        >
                          {i.title}
                        </div>
                      ))
                    : null}
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-around items-center w-full gap-2">
              <button
                onClick={edit_product}
                className="py-2 px-3 rounded-md bg-colorTheme w-full mx-auto text-white mt-5"
              >
                به روزرسانی محصول
              </button>
            </div>
          </form>
        </div>
      </Counter_admin_panel>
    </section>
  );
}

export default Page;
