"use client";
import React, { useEffect, useId, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import {
  delete_property,
  get_one_property,
  update_property,
} from "@/redux/category/action";
import toast from "react-hot-toast";
import { is_closer, is_opener } from "@/redux/modalSlice/modalSlice";
import { useModalHandlers } from "@/redux/Context_provider";
import Title_panel_user from "../../../../../../components/title/Title_panel_user";
import Counter_admin_panel from "../../../../../../components/container/Container_user_panel";
import Loading from "../../../../../../components/loading/Loading";
import { dateChanger } from "@/utils/functions/dateChange/dateChange";
import Input from "@/components/input/Input";

interface ApiResponse {
  message: string;
}

function Page() {
  const route = useRouter();
  const id_property = useParams().id_peroperty;
  const dispatch = useAppDispatch();
  const { setTrueHandler } = useModalHandlers();
  const property = useAppSelector((state) => state.categorySlice.property);

  const [data, setData] = useState({
    title: "",
  });

  useEffect(() => {
    if (typeof id_property === "string") {
      fetcher_data()
        .then((res) => {
          return res;
        })
        .catch((err) => {
          toast.error(err.message);
          route.push(
            "/admin_panel/categories/67af86a5f9c5f3aeccec5e2c/properties"
          );
          return err;
        });
    } else {
      toast.error("خطای داخلی");
      route.push("/admin_panel/categories/67af86a5f9c5f3aeccec5e2c/properties");
    }
  }, []);

  const fetcher_data = async () => {
    const result = await dispatch(
      get_one_property({ id: String(id_property) })
    );
    return result;
  };

  const handleTrueAction = async () => {
    try {
      const result = (await dispatch(
        delete_property({ id: String(id_property) })
      )) as {
        payload: ApiResponse;
      };
      if (delete_property.fulfilled.match(result)) {
        route.push(
          "/admin_panel/categories/67af86a5f9c5f3aeccec5e2c/properties"
        );
        toast.success(result.payload.message);
      } else {
        toast.error(result?.payload?.message);
      }
      dispatch(is_closer());
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    setTrueHandler(() => handleTrueAction);
  }, [setTrueHandler]);

  const handleDeleteProperty = () => {
    dispatch(
      is_opener({
        title: "حذف ویژگی",
        type: "warn",
        section: "آیا اطمینان دارید که میخواهید این ویژگی را حذف کنید ؟",
        is_open: true,
      })
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
  };

  const handleUpdate = async () => {
    try {
      const last_data: {
        title: string;
        body: string[];
      } = {
        title: data.title,
        body: typeof property === "object" ? property?.body || [] : [],
      };

      const result = (await dispatch(
        update_property({ id: String(id_property), last_data })
      )) as { payload: ApiResponse };
      if (update_property.fulfilled.match(result)) {
        toast.success("ویژگی شما با موفقیت به روزرسانی شد")
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
            "در این صفحه میتوانید اطلاعات مربوط به ویژگی هارا مشاهده و به روزرسانی کنید",
          spaner_content:
            "در صورت حذف ویژگی محصولاتی که آن ویژگی را دارا هستن به همان صورت باقی میمانند",
        }}
      >
        {property === "loading" ? (
          <div className="flex flex-row justify-center items-center">
            <Loading />
          </div>
        ) : (
          <div className="flex flex-col justify-start items-start">
            <div className="flex flex-row justify-between items-center w-full mb-5">
              <h2 className="text-xl font-bold mb-5">اطلاعات ویژگی</h2>
              <button
                onClick={() => {
                  handleDeleteProperty();
                }}
                className="bg-red-600 px-3 py-2 rounded-md text-white"
              >
                حذف این ویژگی
              </button>
            </div>
            <div className="flex flex-col justify-start place-items-start gap-2 w-full">
              <div className="flex flex-wrap flex-row justify-start items-center">
                <p>شناسه ویژگی</p>
                <span className="mx-2"> : </span>
                <p>{property?._id}</p>
              </div>
              <div className="flex flex-wrap flex-row justify-start items-center">
                <p>نام ویژگی</p>
                <span className="mx-2"> : </span>
                <p>{property?.title}</p>
              </div>
              <div className="flex flex-wrap flex-row justify-start items-center">
                <p>نوع ویژگی</p>
                <span className="mx-2"> : </span>
                <p>{property?.type}</p>
              </div>
              <div className="flex flex-wrap flex-row justify-start items-center">
                <p>آخرین ویرایش</p>
                <span className="mx-2"> : </span>
                <p>
                  {property ? dateChanger(new Date(property.updatedAt)) : ""}
                </p>
              </div>
              <p className="bg-blue-900 text-white break-words p-3 mt-1 text-justify w-full min-h-[50px]">
                {property?.body.map((i , index) => (
                  <div key={index}>
                    {"-"}
                    {i}
                    {"-"}
                  </div>
                ))}
              </p>
            </div>
            <hr className="bg-gray-500 h-[1px] w-full border-none mx-auto my-5" />
            <h2 className="text-xl font-bold mb-5">ویرایش ویژگی</h2>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="w-full flex flex-col justify-center items-center gap-3"
            >
              <div className="w-full grid gap-6 mb-6 lg:grid-cols-2">
                <div className="w-full flex flex-col justify-start items-center mb-3">
                  <Input
                    placeholder=""
                    align_text={"start"}
                    disabled={false}
                    id={unID.inputTitle}
                    setValue={dataChanger}
                    title={"نام"}
                    name="title"
                    value={data.title}
                  />
                </div>
              </div>
              <button
              onClick={()=>{
                handleUpdate()
              }}
                className="bg-colorTheme w-full px-3 py-2 rounded-md"
                type="submit"
              >
                به روزرسانی
              </button>
            </form>
          </div>
        )}
      </Counter_admin_panel>
    </section>
  );
}

export default Page;
