import { useAppSelector } from "@/redux/store";
import React from "react";
import Box_product from "./../../components/box/box_product_list";
function Table_users() {
  const products = useAppSelector((state) => state.productSlice.products);

  return (
    <div className="parent_custom_table overflow-x-auto whitespace-nowrap w-full">
      <table className="custom-table w-full min-w-[600px]">
        <thead className="pb-5">
          <tr className="bg-colorTheme text-white">
            <th className="p-[20px] px-[10px] text-start">شناسه محصول</th>
            <th className="p-[20px] px-[10px] text-start">نام محصول</th>
            <th className="p-[20px] px-[10px] text-start">وضعیت محصول</th>
            <th className="p-[20px] px-[10px] text-start">قیمت محصول</th>
            <th className="p-[20px] px-[10px] text-start">دسته بندی محصول</th>
            <th className="p-[20px] px-[10px] text-start">در انبار</th>
            <th className="p-[20px] px-[10px] text-start">فروخته شده</th>
            <th className="p-[20px] px-[10px] text-start">تخفیف</th>
            <th className="p-[20px] px-[10px] text-start">اطلاعات محصول</th>
          </tr>
        </thead>
        <tbody className="w-full">
          {typeof products === "object" ? (
            products?.products[0] ? (
              products?.products?.map((i) => (
                <Box_product key={i._id} product={i} />
              ))
            ) : (
              <div className="text-red-600 w-full flex justify-center items-center mt-5">
                محصولی یافت نشد
              </div>
            )
          ) : null}
        </tbody>
      </table>
    </div>
  );
}

export default Table_users;
