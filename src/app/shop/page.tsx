import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import Filter_sort from "@/components/filter/Filter_sort";
import Product_filter from "@/components/filter/Product_filter";
import { category, color, product, size } from "@/type";
import Empty from "../../../public/image/empty/empty.png";
import Product_item_box from "@/components/box/Product_item_box";
import PaginationProductShop from "@/components/pagination/PaginationProductShop";
import Image from "next/image";
import { Metadata } from "next";
import Mobile_filter_product from "@/components/filter/Mobile_filter_product";

export const metadata: Metadata = {
  title: "محصولات | سوزن رویا",
  description:
    "در این صفحه میتوانید تمامی محصولات مورد نیازتون رو ببینید و بهترین محصول با بهترین کیفیت رو خریداری کنید",
  keywords: [
    "خرید بافت",
    "خرید لباس بافتنی",
    "فروشگاه اینترنتی بافت",
    "لباس بافت ارزان",
    "بافت",
    "خرید بافت",
    "خرید بهترین بافت",
    "خرید پوشاک بافتی",
    "خرید بافتنی",
    "خرید لباس بافتنی",
    "بافتنی با بهترین جنس",
    "محصولات",
    "محصولات سوزن رویا",
    "dream needle shop",
    "dream needle products",
  ],
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
    },
  },
  alternates: {
    canonical: "https://dream-needle.ir/shop",
  },
  openGraph: {
    title: "خرید بهترین بافتنی ها",
    description: "بهترین تجربه لباس بافتنی را با ما تجربه کنید",
    url: "https://dream-needle.ir/shop",
    siteName: "فروشگاه سوزن رویا",
    images: [
      {
        url: "https://example.com/images/tshirt-banner.jpg",
        width: 800,
        height: 600,
        alt: "تصویر تیشرت مردانه",
      },
    ],
    locale: "fa_IR",
    type: "website",
  },
};
type ShopSearchParams = Promise<{
  category?: string;
  price?: string;
  colors?: string;
  sizes?: string;
  sort?: string;
  page?: string;
  discount?: string;
}>;

export default async function Page({
  searchParams,
}: {
  searchParams: ShopSearchParams;
}) {
  const resolvedSearchParams = await searchParams;
  const category = resolvedSearchParams.category as string;
  const price = resolvedSearchParams.price as string;
  const colors_query = resolvedSearchParams.colors as string;
  const sizes_query = resolvedSearchParams.sizes as string;
  const sort = resolvedSearchParams.sort as string;
  const page = resolvedSearchParams.page as string;
  const discount = resolvedSearchParams.discount as string;

  const searcher = new URLSearchParams();

  if (category) searcher.set("category", category);
  if (price) searcher.set("price", price);
  if (colors_query) searcher.set("colors", colors_query);
  if (sizes_query) searcher.set("sizes", sizes_query);
  if (sort) searcher.set("sort", sort);
  if (page) searcher.set("page", page);
  if (discount) searcher.set("discount", discount);

  // مقدار پیش‌فرض محصولات
  let products: {
    count: number;
    currentPage: number;
    highest_price: number;
    products: product[];
    totalPages: number;
  } = {
    count: 0,
    currentPage: 1,
    highest_price: 0,
    products: [],
    totalPages: 1,
  };

  let categories: { message: string; data: category[] } = {
    message: "",
    data: [],
  };
  let colors: { message: string; data: color[] } = {
    message: "",
    data: [],
  };
  let sizes: { message: string; data: size[] } = {
    message: "",
    data: [],
  };

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER}/products/shop?${searcher}`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    if (res.ok) products = await res.json();
  } catch (error) {
    console.error("خطا در دریافت محصولات:", error);
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER}/categories?org=1`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    if (res.ok) categories = await res.json();
  } catch (error) {
    console.error("خطا در دریافت دسته‌بندی‌ها:", error);
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER}/colors`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    if (res.ok) colors = await res.json();
  } catch (error) {
    console.error("خطا در دریافت رنگ‌ها:", error);
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER}/sizes`,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    if (res.ok) sizes = await res.json();
  } catch (error) {
    console.error("خطا در دریافت سایزها:", error);
  }
  return (
    <div className="w-full max-w-[1700px] flex flex-col gap-5 mb-20">
      <div className="w-full bg-backgroundColorTheme_1 p-3 py-2 rounded-md">
        <Breadcrumb
          data={[
            { link: "/", title: "خانه" },
            { link: "/shop", title: "محصولات" },
          ]}
        />
      </div>
      <div className="w-full flex flex-row justify-between items-start gap-5 relative">
        <Product_filter
          is_perfor={true}
          query={{ category, price, colors_query, sizes_query }}
          maxPrice={products.highest_price}
          colors={colors}
          sizes={sizes}
          categories={categories}
        />
        <div className="bg-backgroundColorTheme_1 rounded-md p-[10px] w-full flex flex-col justify-start items-center gap-[10px]">
          <>
            <div className="w-full flex flex-row justify-start items-center overflow-x-auto sidbar_panel">
              <Mobile_filter_product
                products={products}
                query={{ category, price, colors_query, sizes_query }}
                colors={colors}
                sizes={sizes}
                categories={categories}
              />
                <Filter_sort
                  sort_code={sort ? String(sort) : "0"}
                />
            </div>
            {products && products?.products[0] ? (
              <>
                <section className="w-full grid 2.5xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 auto-rows-min lg:p-3 p-[6px] place-items-center gap-4">
                  <Product_item_box products={products.products} />
                </section>
                <div className="w-full flex flex-row justify-center items-center">
                  <PaginationProductShop
                    count={products.currentPage}
                    active_page={Number(page) || 1}
                  />
                </div>
              </>
            ) : (
              <div className="w-full flex justify-center items-center flex-col py-5 pb-16">
                <Image
                  height={200}
                  width={200}
                  src={Empty}
                  alt="مقدار خالی برای این قسمت"
                />
                <h3 className="text-center">
                  متاسفانه محصول مورد نظر شما پیدا نشد !!
                </h3>
              </div>
            )}
          </>
        </div>
      </div>
      <div className=""></div>
    </div>
  );
}
