"use client"
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { get_all_user } from '@/redux/userSlice/action'
import React, { useEffect } from 'react'
import Pagination from "./../../../components/pagination/Pagination";
import Counter_admin_panel from "./../../../components/container/Container_user_panel";
import Title_panel_user from "./../../../components/title/Title_panel_user";
import Users_list from "./../../../components/list/users_list";
import Loading from "./../../../components/loading/Loading";


function Page() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(get_all_user({ page: "1", search_phone: "" }))
  }, [])

  const handler = (_: React.ChangeEvent<unknown>, value: number) => {
    dispatch(get_all_user({ page: String(value), search_phone: "" }))
  }

  const user = useAppSelector((state) => state.userSlice.users)


  return (
    <section className='w-full py-5 lg:px-10 px-6'>
      <Title_panel_user title='کاربران' />
      <Counter_admin_panel >
        {
          user === "loading" ?
            <div className='w-full flex justify-center items-center'>
              <Loading />
            </div>
            :
            <Users_list />
        }
        <div className={`w-full flex flex-row justify-center items-center mt-5 ${user === "loading" ? "hidden" : ""}`}>
          <Pagination count={typeof user === "object" ? Number(user?.totalPages) : 1} chande_handler={handler} />
        </div>
      </Counter_admin_panel>
    </section>
  )
}

export default Page