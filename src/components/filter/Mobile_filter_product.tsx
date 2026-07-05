"use client";
import React, { useState } from "react";
import { TbFilterPlus } from "react-icons/tb";
import { motion, AnimatePresence } from "motion/react";
import Product_filter from "@/components/filter/Product_filter";
import { category, color, product, size } from "@/type";

function Mobile_filter_product({
  categories,
  colors,
  sizes,
  products,
  query,
}: {
  products: {
    count: number;
    currentPage: number;
    highest_price: number;
    products: product[];
    totalPages: number;
  };
  categories: { message: string; data: category[] };
  colors: { message: string; data: color[] };
  sizes: { message: string; data: size[] };
  query: { [key: string]: string } | null;
}) {
  const [is_open, setIs_open] = useState(false);
  const category = query?.category as string;
  const price = query?.price as string;
  const colors_query = query?.colors as string;
  const sizes_query = query?.sizes as string;

  return (
    <>
      <div className="pr-1 flex flex-row justify-start items-center lg:mb-5 mb-2 absolute bg-backgroundColorTheme_1 p-1 md:hidden">
        <button
          className="flex flex-row justify-start items-center gap-1"
          onClick={() => setIs_open(!is_open)}
        >
          <TbFilterPlus size={20} className="text-colorTheme" />
          <span className="text-xs font-semibold min-w-[50px]">فیلتر ها</span>
        </button>
        <span className="mx-1 font-semibold text-lg text-[#444]">|</span>
      </div>

      <AnimatePresence>
        {is_open && (
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed inset-0 w-full h-full bg-backgroundColorTheme_2 z-50 overflow-y-auto"
          >
            <div className="p-5 mt-14">
              <Product_filter
                is_filter_handler={() => {
                  setIs_open(false);
                }}
                is_perfor={false}
                query={{ category, price, colors_query, sizes_query }}
                maxPrice={products.highest_price}
                colors={colors}
                sizes={sizes}
                categories={categories}
              />
            </div>
            <button
              onClick={() => setIs_open(false)}
              className="absolute top-4 left-4 p-2 bg-colorTheme text-white rounded-lg"
            >
              بستن
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Mobile_filter_product;
