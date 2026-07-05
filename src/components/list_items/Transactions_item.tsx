import { payment_transactions } from "@/type";
import { useRouter } from "next/navigation";
import React from "react";
import { TbEyeSearch } from "react-icons/tb";
function Order_item({ data }: { data: payment_transactions }) {
  const { _id, amount, createdAt, order, pay_ment, status } = data;

  const router = useRouter();
  return (
    <tr>
      <td className="max-sm:text-xs font-shabnamFont">{_id}</td>
      <td className="max-sm:text-xs">{pay_ment}</td>
      <td className="max-sm:text-xs">
        {status === 1 ? (
          <span className="text-green-500 font-bold">پرداخت موفق</span>
        ) : status === 2 ? (
          <span className="text-red-600 font-bold">پرداخت ناموفق</span>
        ) : (
          <span className="text-orange-500 font-bold">وضعیت نامشخص</span>
        )}
      </td>
      <td className="max-sm:text-xs">{amount.toLocaleString("fa-IR")} تومان</td>
      <td
        onClick={() => router.push(`/admin_panel/orders/${order}`)}
        className="flex flex-row gap-3 cursor-pointer"
      >
        <span>مشاهده سفارش</span>{" "}
        <TbEyeSearch size={20} color="rgb(37, 99, 235)" />
      </td>
      <td className="max-sm:text-xs">{new Date(createdAt).toLocaleDateString("fa-IR")}</td>

    </tr>
  );
}

export default Order_item;
