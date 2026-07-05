"use client";
import {
  create_cart,
  get_all_cart,
  get_count_all_cart,
} from "@/redux/cartSlice/action";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { product } from "@/type";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";

function Box_add_to_cart({
  product,
  children1,
  children2,
}: {
  product: product;
  children1: React.ReactNode;
  children2: React.ReactNode;
}) {
  const dispatch = useAppDispatch();

  const [count, setCount] = useState(1);
  const [count_available, setCount_available] = useState<number | string>(
    "empty"
  );
  const size = useAppSelector((state) => state.productSlice.product_cart_size);
  const color = useAppSelector(
    (state) => state.productSlice.product_cart_color
  );

  useEffect(() => {
    setCount_available(() => {
      const counter = product.count_available.find((i) => {
        return i.color._id === color.color && i.size._id === size.size
          ? i
          : null;
      })?.count;

      return counter ? Number(counter) : "empty";
    });
  }, [size, color]);

  const create_cart_items = async () => {
    if (!color.color || product._id !== color.id_product) {
      toast.error("رنگ مورد نظر خود را انتخاب کنید");
    } else if (!size.size || product._id !== size.id_product) {
      toast.error("سایز لباس مورد نظر خود را انتخاب کنید");
    } else {
      try {
        const result = await dispatch(
          create_cart({
            count,
            color: color.color,
            size: size.size,
            product: product._id,
          })
        );
        await dispatch(get_all_cart())
        await dispatch(get_count_all_cart());
        if (create_cart.fulfilled.match(result)) {
          toast.success("محصول با موفقیت به سبد خرید اضافه شد");
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <>
      <div className="">
        <div>{children1}</div>
      </div>
      <div className="flex flex-row justify-between items-center">
        <span className="w-full text-xl font-semibold">تعداد محصول :</span>
        <div className="flex flex-row justify-center items-center p-2 py-1 pl-3 rounded-md bg-backgroundColorTheme_2 gap-3">
          <div className="flex flex-col justify-center items-center">
            <button
              onClick={() =>
                setCount(() => {
                  if (Number(count_available) > count) {
                    return count + 1;
                  }
                  return count;
                })
              }
            >
              <FaPlus size={13} className="text-colorTheme " />
            </button>
            <button
              onClick={() =>
                setCount(() => {
                  if (count > 1) {
                    return count - 1;
                  }
                  return 1;
                })
              }
            >
              <FaMinus size={13} className="text-colorTheme " />
            </button>
          </div>
          <div className="font-shabnamFont flex justify-center items-center text-xl">
            {count}
          </div>
        </div>
      </div>
      {count_available !== "empty" ? (
        <p
          style={{
            color:
              count_available === 0
                ? "#dc2626"
                : Number(count_available) >= 5
                ? "#22c55e"
                : "#f97316",
          }}
          className={`text-xs font-semibold`}
        >{`موجودی محصول : ${count_available}`}</p>
      ) : null}
      {product.count_available.find((i) => {
        return i.color._id === color.color && i.size._id === size.size
          ? i
          : null;
      })?.count === 0 ? (
        <p
          style={{
            color: "#dc2626",
          }}
          className={`text-xs font-semibold`}
        >{`موجودی محصول : 0`}</p>
      ) : null}
      {children2}
      <button
        onClick={create_cart_items}
        className="p-3 py-2 bg-colorTheme rounded-md w-full text-white mt-5"
      >
        اضافه کردن به سبد خرید
      </button>
    </>
  );
}

export default Box_add_to_cart;
