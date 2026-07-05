"use client";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import Counter_admin_panel from "../../../../../components/container/Container_user_panel";
import Title_panel_user from "../../../../../components/title/Title_panel_user";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import React from "react";
import color_get_all from "@/query_hook/colors/useColor";
import toast from "react-hot-toast";
import { Product_update_gallery } from "@/query_hook/products/useProduct";
import { get_one_product } from "@/redux/product/action";
import Image from "next/image";

function Page() {
  const router = useRouter();
  const id = useParams().id;
  const [data, setData] = useState<{
    data_image: { image: File | string; thumbnail: File | {} };
    data_gallery: Record<string, File | {}>;
  }>({
    data_image: {
      image: "",
      thumbnail: "",
    },
    data_gallery: {},
  });

  const dispatch = useAppDispatch();
  const { mutate: mutate_colors } = color_get_all();
  const { mutate: mutate_update_product_gallery } = Product_update_gallery();

  const product = useAppSelector((state) => state.productSlice.product);
  useEffect(() => {
    if (typeof product === "object") {
      const arr = [...(product?.color || [])];
      const initialData: Record<string, {} | File> = {};

      arr?.forEach((i) => {
        initialData[i._id] = "";
      });

      setData(() => {
        return { ...data, data_gallery: initialData };
      });
    }
  }, [product]);

  useEffect(() => {
    mutate_colors();
    dispatch(get_one_product({ id: String(id) }));
  }, []);


  const dataChanger = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files) {
      setData((state) => ({
        ...state,
        data_gallery: { ...data.data_gallery, [name]: files[0] },
      }));
    }
  };

  const create_product_gallery = async () => {
    let initialData: { color: string; file: File | {} }[] = [];
    for (const key in data.data_gallery) {
      if (!data.data_gallery[key]) {
        initialData = [];
        break;
      } else {
        initialData.push({ color: key, file: data.data_gallery[key] });
      }
    }

    if (!initialData[0]?.file) {
      toast.error("لطفا تمام مقادیر مورد نیاز را وارد کنید");
    } else {
      const new_data = {
        id: String(id),
        data: {
          image: data.data_image.image,
          thumbnail: data.data_image.thumbnail,
          gallery: initialData,
        },
      };

      try {
        await toast.promise(
          new Promise((resolve, reject) => {
            mutate_update_product_gallery(new_data, {
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
      <Title_panel_user title="گالری محصولات" />
      <Counter_admin_panel
        sidContent={{
          title: "آموزش",
          section: "این قسمت صرفا برای به روزرسانی  اطلاعات تصاویر محصول است",
          spaner_content: "از ارسال چندبار عکس خودداری کنید",
        }}
      >
        <div className="flex flex-col justify-start items-start w-full">
          <div className="w-full flex flex-col justify-start items-start">
            {typeof product === "object" ? (
              <>
                <div className="w-full">
                  <p className="w-full mb-4 font-bold">تصویر محصول : </p>
                  <Image
                    src={
                      `${process.env.NEXT_PUBLIC_URL}/uploads/products/${product?.image}` ||
                      ""
                    }
                    width={300}
                    height={300}
                    alt="تصویر محصول"
                  />
                  <input
                    className="w-full my-4"
                    onChange={(e) => {
                      const files = e.target.files;
                      if (files) {
                        setData(() => {
                          return {
                            ...data,
                            data_image: { ...data.data_image, image: files[0] },
                          };
                        });
                      }
                    }}
                    type="file"
                    name={""}
                    id={""}
                  />
                </div>
                <div className="w-full">
                  <p className="w-full my-4 font-bold">
                    تصویر بند انگشتی محصول :{" "}
                  </p>
                  <Image
                    src={
                      `${process.env.NEXT_PUBLIC_URL}/uploads/products/${product?.thumbnail}` ||
                      ""
                    }
                    width={300}
                    height={300}
                    alt="تصویر بند انگشتی محصول"
                  />
                  <input
                    className="w-full my-4"
                    onChange={(e) => {
                      const files = e.target.files;
                      if (files) {
                        setData(() => {
                          return {
                            ...data,
                            data_image: {
                              ...data.data_image,
                              thumbnail: files[0],
                            },
                          };
                        });
                      }
                    }}
                    type="file"
                    name={""}
                    id={""}
                  />
                </div>
              </>
            ) : null}
            <hr className="w-full bg-slate-500 my-5" />
            <div className="w-full">
              {typeof product === "object" ? product?.color.map((i) => (
                <div
                  key={i._id}
                  className="w-full my-4 flex flex-col justify-start items-start"
                >
                  <label className="my-1" htmlFor={i._id}>
                    {i.title}
                  </label>
                  <input
                    onChange={dataChanger}
                    type="file"
                    name={i._id}
                    id={i._id}
                  />
                </div> 
              )) : null}
            </div>
            <div className="flex flex-col justify-around items-center w-full gap-2">
              <button
                onClick={create_product_gallery}
                className="py-2 px-3 rounded-md bg-colorTheme w-full mx-auto text-white mt-5"
              >
                به روزرسانی گالری محصول
              </button>
            </div>
          </div>
        </div>
      </Counter_admin_panel>
    </section>
  );
}

export default Page;
