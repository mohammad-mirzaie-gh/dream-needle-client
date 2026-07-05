"use client";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import Counter_admin_panel from "../../../../../components/container/Container_user_panel";
import Title_panel_user from "../../../../../components/title/Title_panel_user";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import React from "react";
import Input from "@/components/input/Input";
import toast from "react-hot-toast";
import { Product_update_count } from "@/query_hook/products/useProduct";
import { get_one_product } from "@/redux/product/action";

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
  const [data, setData] = useState<Record<string, string | number>>({});

  const dispatch = useAppDispatch();
  const { mutate: mutate_update_product_count } = Product_update_count();

  const product = useAppSelector((state) => state.productSlice.product);

  useEffect(() => {
    dispatch(get_one_product({ id: String(id) }));
  }, []);
  
  useEffect(() => {
    if (typeof product === "object") {
      const arr = [...(product?.count_available || [])];
      const initialData: Record<string, string | number> = {};

      arr?.forEach((i) => {
        initialData[i._id] = i.count;
      });
      setData(initialData);
    }
  }, [product]);


  const dataChanger = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((state) => ({
      ...state,
      [name]: value,
    }));
  };

  const edit_product_count = async () => {
    let initialData: { _id: string; count: number }[] = [];
    for (const key in data) {
      if (Number(data[key]) <= -1) {
        initialData = [];
        break;
      } else {
        initialData.push({ _id: key, count: Number(data[key]) });
      }
    }

    

    if (!initialData[0]) {
      toast.error("اطلاعات تمام محصولات را به درستی وارد کنید");
    } else {
      const new_data = { id: String(id), data: initialData };
      try {
        await toast.promise(
          new Promise((resolve, reject) => {
            mutate_update_product_count(new_data, {
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
      <Title_panel_user title="موجودی محصول" />
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
              {typeof product === "object"
                ? product?.count_available?.map((i, index) => (
                    <div
                      key={index}
                      className="w-full flex flex-col justify-start items-center mb-3"
                    >
                      <Input
                        placeholder="عدد صحیح"
                        align_text={"start"}
                        disabled={false}
                        id={i._id}
                        setValue={dataChanger}
                        title={`${i.color.title} با ${i.size.title}`}
                        name={i._id}
                        value={data[i._id]}
                        type="number"
                      />
                    </div>
                  ))
                : null}
            </div>
            <div className="flex flex-col justify-around items-center w-full gap-2">
              <button
                onClick={edit_product_count}
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
