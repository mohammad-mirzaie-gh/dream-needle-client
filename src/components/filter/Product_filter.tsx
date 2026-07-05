"use client";
import Selector from "@/components/selector/selector";
import MultiSelector from "@/components/selector/multiSelector";
import ColorMultiSelector from "@/components/selector/ColorMultiSelector";
import { category, color, size } from "@/type";
import React, { useEffect, useState } from "react";
import InputRange from "@/components/input/InputRange";
import { useRouter } from "next/navigation";
import { TbFilterX } from "react-icons/tb";
import Link from "next/link";
import { useWindowSize } from "@react-hook/window-size";

function Product_filter({
  is_filter_handler,
  categories,
  colors,
  sizes,
  maxPrice,
  query,
  is_perfor,
}: {
  is_filter_handler?: () => void;
  is_perfor?: boolean;
  maxPrice: number;
  categories: { message: string; data: category[] };
  colors: { message: string; data: color[] };
  sizes: { message: string; data: size[] };
  query: { [key: string]: string } | null;
}) {
  const [width] = useWindowSize();

  const [filter, setFilter] = useState<{
    colors: (color | null)[] | null;
    sizes: (size | null)[] | null;
    categories: category | null;
    maxPrice: number | number[];
  }>({
    colors: [],
    sizes: [],
    categories: null,
    maxPrice: [0, 0],
  });

  useEffect(() => {
    setFilter(() => {
      return {
        ...filter,
        categories:
          categories.data.find((i) => {
            return i._id === query?.category;
          }) || null,
      };
    });
  }, []);

  const router = useRouter();
  const filterHandler = () => {
    const params = new URLSearchParams();

    const colors_query = Array.isArray(filter.colors)
      ? filter.colors[0]
        ? filter.colors.map((i) => i?._id).join("_")
        : null
      : null;
    const sizes_query = Array.isArray(filter.sizes)
      ? filter.sizes[0]
        ? filter.sizes.map((i) => i?._id).join("_")
        : null
      : null;
    const category = filter.categories ? filter.categories._id : null;
    const price = Array.isArray(filter.maxPrice)
      ? filter.maxPrice.join("_")
      : null;
    if (category) {
      params.set("category", category);
    }
    if (colors_query) {
      params.set("colors", colors_query);
    }
    if (sizes_query) {
      params.set("sizes", sizes_query);
    }
    if (price) {
      params.set("price", price);
    }
    const link = `/shop?${params}`;

    router.push(link);
    if (is_filter_handler) {
      is_filter_handler();
    }
  };

  return (
    <>
      {is_perfor ? (
        width >= 768 ? (
          <div className="bg-backgroundColorTheme_1 rounded-md p-[10px] md:w-[320px] w-full sticky top-5">
            <div className="flex flex-col justify-start items-center">
              <div className="w-full flex flex-row justify-between items-center">
                <h2 className="text-xl px-1 text-colorTheme font-lalezarFont">
                  فیلتر ها
                </h2>
                <Link
                  href={"/shop"}
                  onClick={() => {
                    if (is_filter_handler) {
                      is_filter_handler();
                    }
                  }}
                  className="text-sm py-2 px-2 text-red-600 font-semibold"
                >
                  <TbFilterX size={22} />
                </Link>
              </div>
              <div className="flex flex-col justify-start items-center w-full p-2">
                <h3 className="w-full text-start font-semibold">دسته بندی</h3>
                <div className="w-full">
                  <Selector
                    title=""
                    value={filter?.categories?.title || ""}
                    ChangeHandler={(data) => {
                      setFilter(() => {
                        return {
                          ...filter,
                          categories:
                            categories.data.find((i) => {
                              return data === i.title;
                            }) || null,
                        };
                      });
                    }}
                    data={categories.data.map((i) => {
                      return i.title;
                    })}
                  />
                </div>
              </div>
              <div className="flex flex-col justify-start items-center w-full p-2">
                <h3 className="w-full text-start font-semibold">فیلتر قیمت</h3>
                <div className="w-full px-4 mt-2">
                  <InputRange
                    changeHandler={(data) => {
                      setFilter(() => {
                        return { ...filter, maxPrice: data };
                      });
                    }}
                    maxPrice={maxPrice}
                  />
                </div>
              </div>
              <div className="flex flex-col justify-start items-center w-full p-2">
                <h3 className="w-full text-start font-semibold">فیلتر رنگ</h3>
                <div className="w-full">
                  <ColorMultiSelector
                    prevData={[]}
                    orgData={colors.data}
                    title=""
                    ChangeHandler={(data) => {
                      setFilter(() => {
                        return {
                          ...filter,
                          colors:
                            data.map((i) => {
                              return (
                                {
                                  _id: colors.data.find((i2) => {
                                    return i2.title === i;
                                  }),
                                }._id || null
                              );
                            }) || [],
                        };
                      });
                    }}
                    data={colors.data.map((i) => {
                      return i.color_code;
                    })}
                  />
                </div>
              </div>
              <div className="flex flex-col justify-start items-center w-full p-2">
                <h3 className="w-full text-start font-semibold">فیلتر سایز</h3>
                <div className="w-full">
                  <MultiSelector
                    title=""
                    ChangeHandler={(data) => {
                      setFilter(() => {
                        return {
                          ...filter,
                          sizes:
                            data.map((i) => {
                              return (
                                {
                                  _id: sizes.data.find((i2) => {
                                    return i2.size === i;
                                  }),
                                }._id || null
                              );
                            }) || [],
                        };
                      });
                    }}
                    data={sizes.data.map((i) => {
                      return i.size;
                    })}
                  />
                </div>
              </div>
              <div className="flex flex-col justify-start items-center w-full p-2">
                <button
                  onClick={filterHandler}
                  className="w-full rounded-md bg-colorTheme text-white py-2 mt-5"
                >
                  اعمال فیلتر
                </button>
              </div>
            </div>
          </div>
        ) : null
      ) : (
        <div className="bg-backgroundColorTheme_1 rounded-md p-[10px] md:w-[320px] w-full sticky top-5">
          <div className="flex flex-col justify-start items-center">
            <div className="w-full flex flex-row justify-between items-center">
              <h2 className="text-xl px-1 text-colorTheme font-lalezarFont">
                فیلتر ها
              </h2>
              <Link
                onClick={() => {
                  if (is_filter_handler) {
                    is_filter_handler();
                  }
                }}
                href={"/shop"}
                className="text-sm py-2 px-2 text-red-600 font-semibold"
              >
                <TbFilterX size={22} />
              </Link>
            </div>
            <div className="flex flex-col justify-start items-center w-full p-2">
              <h3 className="w-full text-start font-semibold">دسته بندی</h3>
              <div className="w-full">
                <Selector
                  title=""
                  value={filter?.categories?.title || ""}
                  ChangeHandler={(data) => {
                    setFilter(() => {
                      return {
                        ...filter,
                        categories:
                          categories.data.find((i) => {
                            return data === i.title;
                          }) || null,
                      };
                    });
                  }}
                  data={categories.data.map((i) => {
                    return i.title;
                  })}
                />
              </div>
            </div>
            <div className="flex flex-col justify-start items-center w-full p-2">
              <h3 className="w-full text-start font-semibold">فیلتر قیمت</h3>
              <div className="w-full px-4 mt-2">
                <InputRange
                  changeHandler={(data) => {
                    setFilter(() => {
                      return { ...filter, maxPrice: data };
                    });
                  }}
                  maxPrice={maxPrice}
                />
              </div>
            </div>
            <div className="flex flex-col justify-start items-center w-full p-2">
              <h3 className="w-full text-start font-semibold">فیلتر رنگ</h3>
              <div className="w-full">
                <ColorMultiSelector
                  prevData={[]}
                  orgData={colors.data}
                  title=""
                  ChangeHandler={(data) => {
                    setFilter(() => {
                      return {
                        ...filter,
                        colors:
                          data.map((i) => {
                            return (
                              {
                                _id: colors.data.find((i2) => {
                                  return i2.title === i;
                                }),
                              }._id || null
                            );
                          }) || [],
                      };
                    });
                  }}
                  data={colors.data.map((i) => {
                    return i.color_code;
                  })}
                />
              </div>
            </div>
            <div className="flex flex-col justify-start items-center w-full p-2">
              <h3 className="w-full text-start font-semibold">فیلتر سایز</h3>
              <div className="w-full">
                <MultiSelector
                  title=""
                  ChangeHandler={(data) => {
                    setFilter(() => {
                      return {
                        ...filter,
                        sizes:
                          data.map((i) => {
                            return (
                              {
                                _id: sizes.data.find((i2) => {
                                  return i2.size === i;
                                }),
                              }._id || null
                            );
                          }) || [],
                      };
                    });
                  }}
                  data={sizes.data.map((i) => {
                    return i.size;
                  })}
                />
              </div>
            </div>
            <div className="flex flex-col justify-start items-center w-full p-2">
              <button
                onClick={filterHandler}
                className="w-full rounded-md bg-colorTheme text-white py-2 mt-5"
              >
                اعمال فیلتر
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Product_filter;
