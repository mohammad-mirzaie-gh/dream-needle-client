"use client"

import { useAppSelector } from '@/redux/store';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

function Is_login({ children }: { children: React.ReactNode }) {
    const is_login = useAppSelector((state) => state.userSlice.user);
    const loading = useAppSelector((state) => state.userSlice.loading);

    const route = useRouter();

    useEffect(() => {
        if (!loading && !is_login) {
            route.push("/authentication");
        }
    }, [loading, is_login, route]);

    if (!is_login) {
        return null;
    }

    return (
        <>
            {
                loading === true ? <div className={`loadingCircleLoading min-w-9 min-h-9 w-[200px] h-[200px]`}></div> :
                    children
            }
        </>
    );
}

export default Is_login;