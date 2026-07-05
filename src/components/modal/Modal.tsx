"use client"
import React from 'react'

import { PiWarningBold } from "react-icons/pi";
import { MdErrorOutline } from "react-icons/md";
import { RxCheck } from "react-icons/rx";
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { useModalHandlers } from '@/redux/Context_provider';
import { is_closer } from '@/redux/modalSlice/modalSlice';

function Modal() {

    const dispatch = useAppDispatch();
    const { true_handler } = useModalHandlers();
    const { type, title, section } = useAppSelector((state) => state.modalSlice)
    const is_open = useAppSelector((state) => state.modalSlice.is_open)
    const selectionIcon = () => {
        const data = [
            { id: 1, name: "warn", icon: <PiWarningBold size={100} className='text-yellow-400' /> },
            { id: 2, name: "error", icon: <MdErrorOutline size={50} className='text-red-600' /> },
            { id: 3, name: "success", icon: <RxCheck size={50} className='text-green-400' /> },
        ]

        const selection_data_icon = data.find((i) => {
            return i.name === type
        })?.icon

        return selection_data_icon
    }


    return (
        <>
            {
                is_open ?
                    <div className='w-full h-[100dvh] fixed left-0 top-0 flex flex-col justify-center items-center transition-all duration-300 z-[99999] blur_backDrop'>
                        <div className='sm:w-[400px] xs:w-[80%] w-[95%] h-min lg:p-5 p-4 bg-backgroundColorTheme_1 rounded-md shadow-ghost '>
                            <div className='w-full flex flex-col justify-center items-center my-2 mb-3'>
                                <span className='w-full flex justify-center items-center'>
                                    {selectionIcon()}
                                </span>
                                <h2 className='w-full text-2xl text-center font-bold text-textColorTheme'>{title}</h2>
                            </div>
                            {
                                section ?
                                    <p className='w-full p-1 text-justify xs:my-5 my-7 text-textColorTheme'>
                                        {section}
                                    </p>
                                    : null}
                            <div className='flex xs:flex-row flex-col justify-center items-center gap-2 mt-3'>
                                <button onClick={() => {
                                    dispatch(is_closer());
                                }} className='w-full bg-red-500 text-white p-2 px-3 rounded-md'>خیر</button>
                                {
                                    true_handler ?
                                        <button onClick={(e) => {
                                            e.preventDefault()
                                            true_handler();
                                        }} className='w-full bg-green-600 text-white p-2 px-3 rounded-md'>بله اطمینان دارم</button>
                                        : null
                                }
                            </div>
                        </div>
                    </div>
                    : null
            }
        </>
    )
}

export default Modal