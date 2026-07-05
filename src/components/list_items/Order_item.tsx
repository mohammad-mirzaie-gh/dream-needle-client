import { order } from "@/type";
import { useRouter } from "next/navigation";
import React from "react";
import { TbEyeSearch } from "react-icons/tb";
import Status_order_shower from "@/components/utils/Status_order_shower";
function Order_item({ data }: { data: order }) {
  const { _id, amount, is_paid, pay_ment, status, zip_code } = data;

  const router = useRouter();
  return (
    <tr>
      <td className="max-sm:text-xs font-shabnamFont">{_id}</td>
      <td className="max-sm:text-xs font-shabnamFont">{zip_code}</td>
      <td className="max-sm:text-xs">{pay_ment}</td>
      <td className="max-sm:text-xs">
        {is_paid ? (
          <span className="text-green-500 font-bold">پرداخت شده</span>
        ) : (
          <span className="text-red-600 font-bold">پرداخت نشده</span>
        )}
      </td>
      <td className="max-sm:text-xs">{Status_order_shower({status})}</td>
      <td className="max-sm:text-xs">{amount.toLocaleString("fa-IR")} تومان</td>
      <td
        onClick={() => router.push(`/user_panel/orders/${_id}`)}
        className="flex flex-row gap-3 cursor-pointer"
      >
        <span>مشاهده {is_paid ? "" : "| پرداخت"}</span>{" "}
        <TbEyeSearch size={20} color="rgb(37, 99, 235)" />
      </td>
    </tr>
  );
}

export default Order_item;
