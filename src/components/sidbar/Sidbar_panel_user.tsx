"use client";

import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { HiChevronLeft } from "react-icons/hi";
import { TbBasketCheck, TbLayoutDashboard } from "react-icons/tb";
import { TiTicket } from "react-icons/ti";
import { LuUserRoundCog } from "react-icons/lu";
import { FaRegHeart } from "react-icons/fa6";
import { TbFileInvoice } from "react-icons/tb";
import { MdShoppingCartCheckout } from "react-icons/md";
import Link from 'next/link';
import avatar_user from "./../../../public/image/user_avatar/avatar_user.png";
import Image from 'next/image';
import ThemeChanger from '../themeChanger/ThemeChanger';
import { FiX } from "react-icons/fi";
import { is_opener, is_closer } from "./../../redux/modalSlice/modalSlice";
import { useModalHandlers } from '@/redux/Context_provider';
import { log_out } from '@/redux/userSlice/action';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { TbHome } from "react-icons/tb";
import { BsPostcard } from "react-icons/bs";

interface ApiResponse {
  message: string,
}

function Sidbar_panel_user({ setIs_open = () => { } }: { setIs_open?: (open: boolean) => void }) {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.userSlice.user);
  const { setTrueHandler } = useModalHandlers();
  const route = useRouter()
  const sidPanelUser = [
    { id: 1, title: "پیشخوان کاربر", icon: <TbLayoutDashboard size={27} />, link: "/user_panel/counter" },
    { id: 2, title: "تیکت‌ها", icon: <TiTicket size={27} />, link: "/user_panel/tickets" },
    { id: 3, title: "اطلاعات کاربر", icon: <LuUserRoundCog size={27} />, link: "/user_panel/user_information" },
    { id: 4, title: "علاقه‌مندی‌ها", icon: <FaRegHeart size={25} />, link: "/user_panel/favorites" },
    { id: 5, title: "تراکنش و فاکتور‌ها", icon: <TbFileInvoice size={27} />, link: "/user_panel/transactions" },
    { id: 6, title: "سفارش ها", icon: <MdShoppingCartCheckout size={27} />, link: "/user_panel/orders" },
    { id: 7, title: "کد پستی", icon: <BsPostcard size={27} />, link: "/user_panel/code_post" },
  ];

  const handleTrueAction = async () => {
    try {
      const result = await dispatch(log_out()) as { payload: ApiResponse }
      if (log_out.fulfilled.match(result)) {
        toast.success(result.payload.message)
        route.refresh()
      } else {
        toast.error(result?.payload?.message)
      }
      dispatch(is_closer())
    } catch (err) {
      console.error(err);
    }
  };


  useEffect(() => {
    setTrueHandler(() => handleTrueAction);
  }, [setTrueHandler]);

  const handleLogout = () => {
    dispatch(is_opener({
      title: "خروج از حساب کاربری",
      type: "warn",
      section: "در صورت خروج شما اطلاعات شما باقی خواهد ماند و در صورت استفاده از این کاربری باید دوباره وارد شوید",
      is_open: true
    }));
  };

  return (
    <aside className='sidbar_panel h-[100dvh] w-full bg-backgroundColorTheme_1 p-7 py-4 overflow-y-auto transition-all duration-300 flex flex-col justify-between items-center z-50 max-lg:px-4'>
      <div className='w-full'>
        <h2 className='text-2xl my-4 mb-12 font-medium font-lalezarFont hidden md:block'>خوش آمدید 💙</h2>
        <div className='w-full flex justify-around items-center md:hidden'>
          <div className='flex gap-5 my-10'>
            {setIs_open && (
              <button
                className='flex justify-center items-center w-[45px] h-[45px] rounded-full bg-backgroundColorTheme_2 shadow-boxing shadow-[#2563eb]'
                onClick={() => setIs_open(false)}
              >
                <FiX size={20} className='text-colorTheme' />
              </button>
            )}
            <div className='flex justify-center items-center w-[45px] h-[45px] rounded-full p-1 bg-backgroundColorTheme_2 shadow-boxing shadow-[#2563eb]'>
              <TbBasketCheck className="text-colorTheme" size={23} />
            </div>
            <div className='flex justify-center items-center w-[45px] h-[45px] p-1 rounded-full bg-backgroundColorTheme_2 shadow-boxing shadow-[#2563eb]'>
              <ThemeChanger size={25} />
            </div>
          </div>
        </div>
        <div className='w-full bg-colorTheme p-3 rounded-md my-7 flex flex-col justify-center items-center'>
          <div className='-mt-10 rounded-full border-5 border-[#bbbbbb3d]'>
            <Image src={avatar_user} alt='user avatar' height={70} />
          </div>
          <p className='text-xl text-white text-center py-3 font-lalezarFont'>{user?.name} {user?.lastname}</p>
        </div>
        <ul className='w-full flex flex-col mt-10 gap-5'>
          {sidPanelUser.map(item => (
            <Link href={item.link} key={item.id} className='flex justify-between items-center w-full py-4 text-lg font-medium cursor-pointer'>
              <span className='flex items-center'>
                <span className='ml-3 w-[35px] flex justify-center'>{item.icon}</span>
                <p className='w-full mt-1 font-normal text-base'>{item.title}</p>
              </span>
              <HiChevronLeft size={23} />
            </Link>
          ))}
        </ul>
      </div>
      <div className='w-full flex flex-row-reverse justify-center items-center gap-2'>
        <button
          className='flex justify-center items-center w-[50px] bg-backgroundColorTheme_2 mt-5 p-3 rounded-md'
          onClick={() => {
            route.push("/")
          }}>
          <TbHome size={24} className='text-colorTheme' />
        </button>
        <button
          onClick={handleLogout}
          className='flex justify-center items-center w-full bg-backgroundColorTheme_2 mt-5 p-3 max-lg:px-2 rounded-md'
        >
          <span className='text-red-600 font-bold '>خروج از حساب</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidbar_panel_user;