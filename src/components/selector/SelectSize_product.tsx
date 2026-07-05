"use client";
import { stage_add_to_cart_size } from "@/redux/product/productSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { product } from "@/type";
import React from "react";

function SelectSize_product({ product }: { product: product }) {
  const dispatch = useAppDispatch();
  const size = useAppSelector((state) => state.productSlice.product_cart_size);
  return (
    <>
      <div
        className={`flex flex-row justify-start items-center gap-3 pr-2 py-2 rounded-md flex-wrap mt-1`}
      >
        {product.size.map((i, index) => (
          <div
            key={index}
            onClick={() => {
              dispatch(
                stage_add_to_cart_size({ id_product: product._id, size: i._id })
              );
            }}
            className={`cursor-pointer flex flex-row justify-start items-center p-2 rounded-md bg-backgroundColorTheme_2 gap-3 transition-all duration-300${
              i._id === size.size && product._id === size.id_product
                ? " shadow-ghost shadow-colorTheme"
                : ""
            }`}
          >
            <div className="rounded-[50%] cursor-pointer font-semibold text-base flex justify-center items-center">
              <span className="mt-1">{i.size}</span>
            </div>
            <span className="font-semibold">{i.title}</span>
          </div>
        ))}
      </div>
    </>
  );
}

export default SelectSize_product;
