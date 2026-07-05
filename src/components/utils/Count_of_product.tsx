"use client"
import { useAppSelector } from "@/redux/store";
import { product } from "@/type";
import React, { useEffect, useState } from "react";

function Count_of_product({ product }: { product: product , setCount? :()=>void }) {
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


  return (
    <>
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
    </>
  );
}

export default Count_of_product;
