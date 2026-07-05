"use client";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import Counter_admin_panel from "../../../../components/container/Container_user_panel";
import Title_panel_user from "../../../../components/title/Title_panel_user";
import { useRouter } from "next/navigation";
import { useEffect, useId, useState } from "react";
import React from "react";
import Input from "@/components/input/Input";
import Selector from "@/components/selector/selector";
import MultiSelector from "@/components/selector/multiSelector";
import { get_all_category } from "@/redux/category/action";
import size_get_all from "@/query_hook/sizes/useSize";
import color_get_all from "@/query_hook/colors/useColor";
import toast from "react-hot-toast";
import { Product_create } from "@/query_hook/products/useProduct";


export interface data_type {
  title: string;
  category: string;
  low_description: string;
  price: number;
  count_available: number;
  color: string[];
  size: string[];
  image: {};
  thumbnail: {};
}

function Page() {
  const router = useRouter();
  const [data, setData] = useState<data_type>({
    title: "",
    category: "",
    low_description: "",
    price: 0,
    count_available: 0,
    color: [],
    size: [],
    image: {},
    thumbnail: {},
  });

  const dispatch = useAppDispatch();
  const { mutate: mutate_sizes } = size_get_all();
  const { mutate: mutate_colors } = color_get_all();
  const { mutate: mutate_create_product } = Product_create();

  useEffect(() => {
    dispatch(get_all_category());
    mutate_sizes();
    mutate_colors();
  }, []);

  const categories = useAppSelector((state) => state.categorySlice.categories);
  const sizes = useAppSelector((state) => state.templateSlice.sizes);
  const colors = useAppSelector((state) => state.templateSlice.colors);

  const data_to_string = (data: {title : string}[]) => {
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

  const create_product = async () => {
    if (data.price <= 9999) {
      toast.error("قیمت نمیتواند کمتر از 10000 تومان باشد");
    } else {
      try {
        await toast.promise(
          new Promise((resolve, reject) => {
            mutate_create_product(data, {
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
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <section className="w-full py-5 lg:px-10 px-6">
      <Title_panel_user title="محصولات" />
      <Counter_admin_panel>
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
              <div className="w-full flex flex-col justify-start items-center mb-3">
                <Selector
                  value={
                    Array.isArray(categories)
                      ? categories.find((i) => {
                          return i._id === data.category;
                        })?.title || ""
                      : ""
                  }
                  data={
                    data_to_string(
                      Array.isArray(categories) ? categories : []
                    ) || []
                  }
                  ChangeHandler={(i) => {
                    const category_find = Array.isArray(categories)
                      ? categories.find((i2) => {
                          return i === i2.title;
                        })?._id
                      : "";
                    setData(() => {
                      return {
                        ...data,
                        category: category_find as string,
                      };
                    });
                  }}
                  title="دسته بندی محصول"
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
              </div>
            </div>
            <div className="w-full p-5">
              <label className="text-textColorTheme w-full font-bold text-start">
                عکس محصول
              </label>
              <input
                type="file"
                name="image"
                accept="image/jpeg, image/png"
                className="w-full my-2"
                onChange={(e) => {
                  setData(() => {
                    if (e.target.files && e.target?.files[0]) {
                      return { ...data, image: e.target.files[0] };
                    }
                    return { ...data };
                  });
                }}
              />
            </div>
            <div className="w-full p-5">
              <label className="text-textColorTheme w-full font-bold text-start">
                عکس بند انگشتی
              </label>
              <input
                type="file"
                name="image"
                accept="image/jpeg, image/png"
                className="w-full my-2"
                onChange={(e) => {
                  setData(() => {
                    if (e.target.files && e.target?.files[0]) {
                      return { ...data, thumbnail: e.target.files[0] };
                    }
                    return { ...data };
                  });
                }}
              />
            </div>
            <div className="flex flex-col justify-around items-center w-full gap-2">
              <button
                onClick={create_product}
                className="py-2 px-3 rounded-md bg-colorTheme w-full mx-auto text-white mt-5"
              >
                ساخت محصول
              </button>
            </div>
          </form>
        </div>
      </Counter_admin_panel>
    </section>
  );
}

export default Page;
