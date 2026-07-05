import { order } from "@/type";
import { useRouter } from "next/navigation";
import React from "react";
import { TbEyeSearch } from "react-icons/tb";
import { useAppDispatch } from "@/redux/store";
import { update_order_status } from "@/redux/orderSlice/action";
import toast from "react-hot-toast";
function Order_item({ data }: { data: order }) {
  const dispatch = useAppDispatch();
  const {
    _id,
    amount,
    is_paid,
    pay_ment,
    status,
    zip_code,
    active_order,
    user,
  } = data;

  const change_status = async (status: string) => {
    try {
      const result = await dispatch(
        update_order_status({
          description: "وضعیت سفارش توسط مدیریت عوض شد",
          id: _id,
          status: Number(status),
          user: user._id,
        })
      );
      if (update_order_status.fulfilled.match(result)) {
        toast.success("وضعیت با موفقیت تغیر کرد");
      } else {
        const resu = result.payload as { message: string };
        toast.error(resu.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const router = useRouter();
  return (
    <tr>
      <td className="max-sm:text-xs font-shabnamFont">{_id}</td>
      <td className="max-sm:text-xs font-shabnamFont">{zip_code}</td>
      <td className="max-sm:text-xs font-shabnamFont">{user.phone}</td>
      <td className="max-sm:text-xs">{pay_ment}</td>
      <td className="max-sm:text-xs">
        {is_paid ? (
          <span className="text-green-500 font-bold">پرداخت شده</span>
        ) : (
          <span className="text-red-600 font-bold">پرداخت نشده</span>
        )}
      </td>
      <td className="max-sm:text-xs">
        {" "}
        <select
          onChange={(e) => {
            change_status(e.target.value);
          }}
          className={`text-center text-textColorTheme outline-none border-none bg-backgroundColorTheme_2`}
        >
          <option
            className="text-green-500"
            value={"0"}
            selected={status === 0 ? true : false}
          >
            در انتظار پرداخت
          </option>
          <option
            className="text-green-500"
            value={"1"}
            selected={status === 1 ? true : false}
          >
            در حال ارسال به پست
          </option>
          <option
            className="text-green-500"
            value={"2"}
            selected={status === 2 ? true : false}
          >
            مرسوله تحویل پست شده
          </option>
          <option
            className="text-green-500"
            value={"3"}
            selected={status === 3 ? true : false}
          >
            مرجوعی
          </option>
          <option
            className="text-green-500"
            value={"4"}
            selected={status === 4 ? true : false}
          >
            تحویل داده شد
          </option>
          <option
            className="text-green-500"
            value={"5"}
            selected={status === 5 ? true : false}
          >
            کمبود محصول
          </option>
        </select>
      </td>
      <td className="max-sm:text-xs">{active_order ? "فعال" : "غیر فعال"}</td>
      <td className="max-sm:text-xs">{amount.toLocaleString("fa-IR")} تومان</td>
      <td
        onClick={() => router.push(`/admin_panel/orders/${_id}`)}
        className="flex flex-row h-fit gap-3 cursor-pointer"
      >
        مشاهده <TbEyeSearch size={20} color="rgb(37, 99, 235)" />
      </td>
    </tr>
  );
}

export default Order_item;
