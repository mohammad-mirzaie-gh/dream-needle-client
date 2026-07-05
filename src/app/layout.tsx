import type { Metadata } from "next";
import Provider from "./../redux/provider";
import { Vazirmatn, Lalezar } from "next/font/google";
import "./globals.css";
import ThemeChanger from "./../hooks/themeChanger/themeChanger";
import GetInformation from "@/utils/functions/getInformation/GetInformation";
import Modal from "./../components/modal/Modal";
import Providers_query from "./../query_hook/providers_query";
const vazir = Vazirmatn({
  variable: "--vazirFont",
  subsets: ["latin"],
});
const lalezar = Lalezar({
  variable: "--lalezarFont",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "سوزن رویا",
  description:
    "سوزن رویا یکی از بهترین وب سایت ها برای فروش و ارائه خدمات بافت و لباس های بافتنی ",
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
    "home",
    "خانه",
    "دریم نیدل",
    "dream needle",
    "dream-needle",
    "سوزن رویا",
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
    title: "سوزن رویا",
    description: "بهترین تجربه خرید لباس بافتنی را با ما داشته باشید",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body className={`${vazir.variable} ${lalezar.variable}`}>
        <Providers_query>
          <Provider>
            {children}
            <ThemeChanger />
            <GetInformation />
            <Modal />
          </Provider>
        </Providers_query>
      </body>
    </html>
  );
}
