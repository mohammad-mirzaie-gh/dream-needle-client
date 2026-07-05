import { useModalHandlers } from "@/redux/Context_provider";
import { is_closer} from "@/redux/modalSlice/modalSlice";
import { update_product_active } from "@/redux/product/action";
import { useAppDispatch } from "@/redux/store";
import { color, product, size } from "@/type";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { HiOutlinePencil } from "react-icons/hi";
import { IoInformation } from "react-icons/io5";
import { GrGallery } from "react-icons/gr";
import { GrDatabase } from "react-icons/gr";
import { VscSurroundWith } from "react-icons/vsc";

interface ApiResponse {
  message: string;
}

function Box_product_list({ product }: { product: product }) {
  const {} = product;
  const route = useRouter();
  const dispatch = useAppDispatch();
  const { setTrueHandler } = useModalHandlers();
  const [active, setActive] = useState<boolean>(product.active_status);

  useEffect(() => {
    if (product.active_status !== active) {
      handleTrueAction();
    }
  }, [active]);

  const handleTrueAction = async () => {
    try {
      const result = (await dispatch(
        update_product_active({ id: String(product._id), active })
      )) as { payload: ApiResponse };
      if (update_product_active.fulfilled.match(result)) {
        toast.success("با موفقیت به روزرسانی شد");
      } else {
        toast.error(result?.payload?.message);
      }
      dispatch(is_closer());
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    setTrueHandler(() => handleTrueAction);
  }, [setTrueHandler]);

  const all_count_products = (
    data: { _id: string; color: color; size: size; count: string | number }[]
  ) => {
    let flag = 0;
    for (const i of data) {
      flag = flag + Number(i.count);
    }
    return flag;
  };

  all_count_products(product.count_available);

  return (
    <tr>
      <th className="p-[20px] px-[10px] text-start truncate">{product._id}</th>
      <th className="p-[20px] px-[10px] text-start truncate">
        {product.title}
      </th>
      <th className="p-[20px] px-[10px] text-start">
        <select
          onChange={(e) => {
            setActive(e.target.value === "true" ? true : false);
          }}
          className={`text-center outline-none border-none bg-backgroundColorTheme_2 text-${
            product.active_status ? "green-500" : "red-600"
          }`}
        >
          <option
            className="text-green-500"
            value={"true"}
            selected={product.active_status ? true : false}
          >
            فعال
          </option>
          <option
            className="text-red-600"
            value={"false"}
            selected={product.active_status ? false : true}
          >
            غیر فعال
          </option>
        </select>
      </th>
      <th className="p-[20px] px-[10px] text-start font-shabnamFont text-2xl">
        {product.price}
      </th>
      <th className="p-[20px] px-[10px] text-start">
        {product?.category?.title}
      </th>
      <th className="p-[20px] px-[10px] text-start">
        {product.count_available ? (
          <div className="text-textColorTheme flex flex-row justify-center items-center p-1 rounded-md bg-backgroundColorTheme_2 w-[40px] h-[40px] shadow-ghost shadow-red-600">
            <span className="mt-1">{all_count_products(product.count_available)}</span>
          </div>
        ) : null}
      </th>
      <th className="p-[20px] px-[10px] text-start">
        <div className="text-textColorTheme flex flex-row justify-center items-center p-1 rounded-md bg-backgroundColorTheme_2 w-[40px] h-[40px] shadow-ghost shadow-green-500">
          <span className="mt-1">{product.count_purchased}</span>
        </div>
      </th>
      <th className="p-[20px] px-[10px] text-start">
        {product.discount ? (
          <span className="text-green-500">دارد</span>
        ) : (
          <span className="text-red-600">ندارد</span>
        )}
      </th>
      <th className="p-[20px] px-[10px] text-start flex -flex-row items-center">
        <button
          onClick={() => {
            route.push(`/admin_panel/products/edit/${product._id}`);
          }}
          className="p-[7px] rounded-md"
        >
          <HiOutlinePencil className="text-white bg-green-600 p-[6px] rounded-md w-[30px] h-[30px] shadow-ghost shadow-green-500" />
        </button>
        <button
          onClick={() => {
            route.push(`/admin_panel/products/gallery/${product._id}`);
          }}
          className="p-[7px] rounded-md"
        >
          <GrGallery className="text-white bg-green-600 p-[6px] rounded-md w-[30px] h-[30px] shadow-ghost shadow-green-500" />
        </button>
        <button
          onClick={() => {
            route.push(`/admin_panel/products/property/${product._id}`);
          }}
          className="p-[7px] rounded-md"
        >
          <GrDatabase className="text-white bg-green-600 p-[6px] rounded-md w-[30px] h-[30px] shadow-ghost shadow-green-500" />
        </button>
        <button
          onClick={() => {
            route.push(`/admin_panel/products/count/${product._id}`);
          }}
          className="p-[7px] rounded-md"
        >
          <VscSurroundWith className="text-white bg-green-600 p-[6px] rounded-md w-[30px] h-[30px] shadow-ghost shadow-green-500" />
        </button>
        <button
          // onClick={() => {
          //   route.push(`/admin_panel/products/edit/${product._id}`)
          // }}
          className="p-[7px] rounded-md"
        >
          <IoInformation className="text-white bg-colorTheme p-1 rounded-md w-[30px] h-[30px] shadow-ghost shadow-colorTheme" />
        </button>
      </th>
    </tr>
  );
}

export default Box_product_list;
