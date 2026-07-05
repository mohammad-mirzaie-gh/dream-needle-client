import axios from "axios";

export const instance_by_auth = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_SERVER,
    timeout: 50000,
    withCredentials: true
})

export const instance_no_auth = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_SERVER,
    timeout: 20000,
    withCredentials: true
})


