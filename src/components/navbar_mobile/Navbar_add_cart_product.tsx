"use client";
import { create_cart } from "@/redux/cartSlice/action";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { product } from "@/type";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaMinus, FaPlus } from "react-icons/fa";

function Navbar_add_cart_product({
  product,
  children,
}: {
  product: product;
  children: React.ReactNode;
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
        if (create_cart.fulfilled.match(result)) {
          toast.success("محصول با موفقیت به سبد خرید اضافه شد");
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <nav className="fixed bottom-[66px] left-0 mx-auto w-full bg-backgroundColorTheme_1 lg:hidden flex flex-row justify-around items-center z-50 py-3 pb-3 gap-3 border-colorTheme border-solid border-b-[1px] shadow-boxing shadow-colorTheme">
      <div className="flex flex-row justify-center items-center">
        <div>{children}</div>
        <div className="flex flex-row justify-center items-center p-1 pl-2 py-[2px] rounded-md bg-backgroundColorTheme_2 gap-2">
          <div className="flex flex-col justify-center items-center gap-1">
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
              <FaPlus size={11} className="text-colorTheme " />
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
              <FaMinus size={11} className="text-colorTheme " />
            </button>
          </div>
          <div className="font-shabnamFont flex justify-center items-center text-lg">
            {count}
          </div>
        </div>
      </div>
      <button
        onClick={create_cart_items}
        className="py-1 px-4 text-sm bg-colorTheme rounded-md text-white"
      >
        + سبد&#8204;خرید
      </button>
    </nav>
  );
}

export default Navbar_add_cart_product;
