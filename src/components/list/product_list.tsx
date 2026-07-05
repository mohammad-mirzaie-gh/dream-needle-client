"use client"
import React, { useState } from 'react'
import Table_products from "./../table/table_products";
import Input from '../input/Input';
import { useAppDispatch } from '@/redux/store';
import { get_all_product } from '@/redux/product/action';


function Users_list() {
    const [category, setCategory] = useState("")
    const dispatch = useAppDispatch()
    const click_search_handler = () => {
        try {
            dispatch(get_all_product({ limit : "10" , page: "1", category: category }))
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <>
            <form onSubmit={(e) => e.preventDefault()} className='w-full flex sm:flex-row flex-col gap-3 justify-start items-end mb-5'>
                <div className='w-full'>
                    <Input setValue={(e) => setCategory(e.target.value)} value={category} title={"شناسه دسته بندی"} align_text={"end"} disabled={false} id={"55"} name='phone_search' placeholder='مثال : aw5435awd5a4wd4a65wd' />
                </div>
                <button onClick={click_search_handler} className='sm:w-[200px] w-full px-3 py-2 rounded-md bg-colorTheme'>جست و جو</button>
            </form>
            <Table_products></Table_products>
        </>
    )
}

export default Users_list