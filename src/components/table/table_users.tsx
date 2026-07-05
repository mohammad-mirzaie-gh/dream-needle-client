import { useAppSelector } from '@/redux/store'
import React from 'react'
import Box_user from "./../../components/box/box_user_list";
function Table_users() {
    const user = useAppSelector((state) => state.userSlice.users)

    return (
        <div className="parent_custom_table overflow-x-auto whitespace-nowrap w-full">
            <table className="custom-table w-full min-w-[600px]">
                <thead className='pb-5'>
                    <tr className='bg-colorTheme text-white'>
                        <th className='p-[20px] px-[10px] text-start'>شناسه کاربر</th>
                        <th className='p-[20px] px-[10px] text-start'>نام و نام خانوادگی</th>
                        <th className='p-[20px] px-[10px] text-start'>شماره تلفن</th>
                        <th className='p-[20px] px-[10px] text-start'>سطح کاربر</th>
                        <th className='p-[20px] px-[10px] text-start'>اطلاعات کامل</th>
                    </tr>
                </thead>
                <tbody className='w-full'>
                    {
                        typeof user === "object" ?
                            user?.users[0] ? user?.users.map((i) => (
                                <Box_user key={i._id} user={i} />
                            )) : <div className='text-rose-500 w-full flex justify-center items-center mt-5'>کاربری یافت نشد</div> : null
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Table_users