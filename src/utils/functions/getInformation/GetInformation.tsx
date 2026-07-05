"use client"

import { useAppDispatch } from '@/redux/store';
import React, { useEffect } from 'react'
import { get_is_login } from "../../../redux/userSlice/action";


interface ApiResponse {
  message: string,
  is_login?: boolean,
}

function GetInformation() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    getInfo()
  }, [])

  const getInfo = async () => {
    try {
      const result = await dispatch(get_is_login()) as { payload: ApiResponse }
      return result
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <></>
  )
}

export default GetInformation