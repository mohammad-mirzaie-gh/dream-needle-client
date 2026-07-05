"use client";
import React, { useEffect } from "react";
import Template_table from "./../table/Template_table";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import Transactions_item from "@/components/list_items/Transactions_item";
import Big_loading from "@/components/loading/Big_loading";
import PaginationProductShop from "@/components/pagination/PaginationProductShop";
import { useSearchParams } from "next/navigation";
import { get_all_admin_transaction } from "@/redux/paymentSlice/action";
import Empty from "../../../public/image/empty/empty.png";
import Image from "next/image";
function Users_list() {
  const dispatch = useAppDispatch();
  const data = useAppSelector((state) => state.paymentSlice.transactions);
  const page = useSearchParams().get("page");

  useEffect(() => {
    dispatch(get_all_admin_transaction({ page: page || "1" }));
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
              Box={Transactions_item}
              data={data.data}
              headers={[
                "شناسه پرداخت",
                "درگاه",
                "وضعیت تراکنش",
                "قیمت",
                "سفارش مرتبت",
                "تاریخ پرداخت",
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
            تراکنشی وجود ندارد
          </div>
        )
      ) : null}
    </>
  );
}

export default Users_list;
