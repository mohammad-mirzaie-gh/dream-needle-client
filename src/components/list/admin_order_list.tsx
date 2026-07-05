"use client";
import React, { useEffect } from "react";
import Template_table from "./../table/Template_table";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import Order_item from "@/components/list_items/Order_admin_item";
import { get_all_admin_order } from "@/redux/orderSlice/action";
import Big_loading from "@/components/loading/Big_loading";
import PaginationProductShop from "@/components/pagination/PaginationProductShop";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Empty from "../../../public/image/empty/empty.png";

function Users_list() {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.orderSlice.orders);
  const page = useSearchParams().get("page");

  useEffect(() => {
    dispatch(get_all_admin_order({ page: page || "1" }));
  }, [page]);

  return (
    <>
      {data === "loading" ? (
        <div className="w-full flex flex-row justify-center items-center min-h-[300px]">
          <Big_loading />
        </div>
      ) : typeof data === "object" ? (
        data && data.data[0] ? (
          <>
            <Template_table
              Box={Order_item}
              data={data.data}
              headers={[
                "شناسه سفارش",
                "کد پستی",
                "تلفن کاربر",
                "درگاه",
                "وضعیت پرداخت",
                "وضعیت سفارش",
                "فعالیت",
                "قیمت",
                "اطلاعات بیشتر",
              ]}
            />
            {Number(data.totalPages) === 1 ? null : (
              <div className="flex flex-row justify-center items-center my-5">
                <PaginationProductShop
                  active_page={Number(data.currentPage)}
                  count={data.totalPages}
                />
              </div>
            )}
          </>
        ) : (
          <div className="w-full flex flex-col gap-3 justify-center items-center mt-5">
            <Image src={Empty} alt="خالی است" width={300} height={300} />
            سفارشی وجود ندارد
          </div>
        )
      ) : null}
    </>
  );
}

export default Users_list;
