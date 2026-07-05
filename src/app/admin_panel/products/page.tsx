"use client";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import Counter_admin_panel from "./../../../components/container/Container_user_panel";
import Title_panel_user from "./../../../components/title/Title_panel_user";
import Loading from "./../../../components/loading/Loading";

import { useRouter } from "next/navigation";
import Product_list from "@/components/list/product_list";
import Pagination from "./../../../components/pagination/Pagination";
import { get_all_product } from "@/redux/product/action";
import { useEffect } from "react";

function Page() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const products = useAppSelector((state) => state.productSlice.products);

  useEffect(() => {
    dispatch(get_all_product({ limit: "10", page: "1", category: "" }));
  }, []);

  const handler = (_: React.ChangeEvent<unknown>, value: number) => {
    dispatch(get_all_product({ limit: "10", page: value, category: "" }));
  };

  return (
    <section className="w-full py-5 lg:px-10 px-6">
      <Title_panel_user title="محصولات" />
      <Counter_admin_panel>
        <div>
          <button onClick={()=>{
            router.push("/admin_panel/products/create")
          }} className="w-full py-2 px-3 text-white rounded-md bg-colorTheme">ساخت محصول جدید</button>
        </div>
        <hr className="bg-gray-500 h-[1px] w-full border-none mx-auto my-5" />
        {products === "loading" ? (
          <div className="w-full flex justify-center items-center">
            <Loading />
          </div>
        ) : (
          <>
            <Product_list />
            <div className="w-full flex flex-row justify-center items-center my-5">
              <Pagination
                count={
                  typeof products === "object"
                    ? Number(products?.totalPages)
                    : 1
                }
                chande_handler={handler}
              />
            </div>
          </>
        )}
      </Counter_admin_panel>
    </section>
  );
}

export default Page;
