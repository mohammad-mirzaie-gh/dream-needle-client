"use client"
import React, { useState } from 'react'
import Table_users from "./../table/table_users";
import Input from '../input/Input';
import { useAppDispatch } from '@/redux/store';
import { get_all_user } from '@/redux/userSlice/action';


function Users_list() {
    const [phone, setPhone] = useState("")
    const dispath = useAppDispatch()
    const click_search_handler = () => {
        try {
            dispath(get_all_user({ page: "1", search_phone: phone }))
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <>
            <form onSubmit={(e) => e.preventDefault()} className='w-full flex sm:flex-row flex-col gap-3 justify-start items-end mb-5'>
                <div className='w-full'>
                    <Input setValue={(e) => setPhone(e.target.value)} value={phone} title={"جستجو کاربر با شماره تلفن"} align_text={"end"} disabled={false} id={"55"} name='phone_search' placeholder='مثال : 09398895555' />
                </div>
                <button onClick={click_search_handler} className='sm:w-[200px] w-full px-3 py-2 rounded-md bg-colorTheme'>جست و جو</button>
            </form>
            <Table_users></Table_users>
        </>
    )
}

export default Users_list