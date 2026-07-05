"use client";
import { get_count_all_cart } from "@/redux/cartSlice/action";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import React, { useEffect } from "react";
import { TbShoppingCart } from "react-icons/tb";

function Icon_count_carts({ size }: { size: number }) {
  const dispatch = useAppDispatch();
  const get_count = async()=> await dispatch(get_count_all_cart());
  const count_of_cart = useAppSelector(
    (state) => state.cartSlice.cart_count_items
  );

  useEffect(() => {
    get_count()
  }, []);

  return (
    <div className="relative">
      {count_of_cart && typeof count_of_cart === "number" ? (
        <span className="flex justify-center text-white items-center absolute bg-colorTheme rounded-[50%] w-4 h-4 font-bold text-xs -right-[6px] -top-[6px]">{count_of_cart.toLocaleString("fa-IR")}</span>
      ) : null}
      <TbShoppingCart className="text-colorTheme" size={size || 20} />
    </div>
  );
}

export default Icon_count_carts;
