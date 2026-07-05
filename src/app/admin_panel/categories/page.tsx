"use client"
import { useAppDispatch, useAppSelector } from '@/redux/store'
import { create_category, get_all_category } from '@/redux/category/action'
import React, { useEffect, useState } from 'react'
import Counter_admin_panel from "./../../../components/container/Container_user_panel";
import Title_panel_user from "./../../../components/title/Title_panel_user";
import Loading from "./../../../components/loading/Loading";
import Category_list from "./../../../components/list/category_list"
import { category } from '@/type';
import { useRouter } from 'next/navigation';
import Input from '@/components/input/Input';
import { FaRegSquarePlus } from "react-icons/fa6";
import toast from 'react-hot-toast';

interface ApiResponse {
    message: string
}

function Page() {
    const dispatch = useAppDispatch()
    const router = useRouter()
    const [parent_category, setParent_category] = useState("")
    const categories = useAppSelector((state) => state.categorySlice.categories)
    useEffect(() => {
        dispatch(get_all_category())
    }, [])
    function buildTree(categories: category[]): category[] {
        const categoryMap = new Map<string, category>();
        const tree: category[] = [];
        const categoriesCopy = categories.map(category => ({ ...category, children: [] }));
        categoriesCopy.forEach(category => {
            categoryMap.set(category._id, category);
        });
        categoriesCopy.forEach(category => {
            if (category.category_parent) {
                const parent = categoryMap.get(category.category_parent);
                if (parent) {
                    parent?.children?.push(category);
                }
            } else {
                tree.push(category);
            }
        });

        return tree;
    }
    const tree = buildTree(Array.isArray(categories) ? categories : [])

    const create_category_handler = async () => {
        if (parent_category) {
            try {
                const result = await dispatch(create_category({ data: { title: parent_category, type: ["blog", "product", "training"], description: "توضیحات مشخصی برای این دسته بندی اضافه نشده", category_parent: null , is_original : false } })) as { payload: ApiResponse }
                if (create_category.fulfilled.match(result)) {
                    toast.success("دسته بندی مادر شما با موفقیت اضافه شد")
                } else {
                    toast.error(result.payload.message)
                }
            } catch (err) {
                console.error(err);
            }
        } else {
            toast.error("لطفا مقدار معتبر برای دسته بندی مادر وارد کنید")
        }
    }

    return (
        <section className='w-full py-5 lg:px-10 px-6'>
            <Title_panel_user title='دسته بندی ها' />
            <Counter_admin_panel sidContent={{ title: "راهنمایی", section: "هیچ راهنمایی در کار نیست", spaner_content: "اگر خودت فهمیدی حسابه" }}>
                {
                    categories === "loading" ?
                        <div className='w-full flex justify-center items-center'>
                            <Loading />
                        </div>
                        :
                        <>
                            <div className='flex flex-col justify-center items-center w-full gap-4'>
                                <Input align_text={"start"} disabled={false} id={"13154655"} name='parent_category' placeholder='نام دسته بندی' setValue={(e) => setParent_category(e.target.value)} title={"اضافه کردن دسته بندی مادر"} value={parent_category} />
                                <button onClick={() => create_category_handler()} className='sm:w-[300px] w-full bg-colorTheme text-white py-2 rounded-md flex flex-row justify-center items-center gap-3 px-3'><FaRegSquarePlus size={30} className='text-white max-sm:hidden' />اضافه کردن دسته بندی مادر</button>
                            </div>
                            {categories ?
                                categories[0] ?
                                    <Category_list setCategory={(data: string) => {router.push(`/admin_panel/categories/${data}`)
                                }} categories={tree} />
                                    : <span className='text-rose-500 w-full text-center mt-5'>دسته بندی وجود ندارد</span>
                                : null
                            }
                        </>
                }
            </Counter_admin_panel>
        </section>
    )
}

export default Page