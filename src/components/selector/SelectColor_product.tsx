"use client";

import { stage_add_to_cart_color } from "@/redux/product/productSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { product } from "@/type";
import React from "react";

function SelectColor_product({ product }: { product: product }) {
  const dispatch = useAppDispatch();
  const color = useAppSelector(
    (state) => state.productSlice.product_cart_color
  );
  return (
    <>
      <div className="flex flex-row justify-start items-center gap-3 pr-2 py-3 rounded-md flex-wrap">
        {product.color.map((i, index) => (
          <div
            key={index}
            onClick={() => {
              dispatch(
                stage_add_to_cart_color({
                  id_product: product._id,
                  color: i._id,
                })
              );
            }}
            className={`cursor-pointer flex flex-row justify-start items-center p-2 rounded-md bg-backgroundColorTheme_2 gap-3   transition-all duration-300${
              i._id === color.color && product._id === color.id_product
                ? " shadow-ghost shadow-colorTheme"
                : ""
            }`}
          >
            <div
              style={{ backgroundColor: i.color_code }}
              className="rounded-[50%] cursor-pointer font-semibold text-base flex justify-center items-center w-[25px] h-[25px]"
            ></div>
            <span className="font-semibold">{i.title}</span>
          </div>
        ))}
      </div>
    </>
  );
}

export default SelectColor_product;
