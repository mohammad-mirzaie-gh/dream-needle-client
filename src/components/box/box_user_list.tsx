import { user } from '@/type'
import { useRouter } from 'next/navigation';
import React from 'react'
import { TbEyeSearch } from "react-icons/tb";

function Box_user_list({ user }: { user: user }) {
  const { _id, lastname, name, role , phone } = user
  const router = useRouter()
  return (
    <tr>
      <td>{_id}</td>
      <td>{name + " " +lastname}</td>
      <td>{phone}</td>
      <td>{role === 1 ? "ادمین مدیریتی" : role === 2 ? "ادمین ساده" : "کاربر ساده"}</td>
      <td onClick={()=>router.push(`/admin_panel/users/${_id}`)} className='flex flex-row gap-3 cursor-pointer'><span>مشاهده اطلاعات کامل</span> <TbEyeSearch size={20} color='rgb(37, 99, 235)'/></td>
    </tr>
  )
}

export default Box_user_list