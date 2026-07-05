import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface state {
    title: string, type?: "warn" | "error" | "success", section?: string, is_open: boolean
}

const initialState: state =
{
    title: "",
    type: "warn",
    section: "",
    is_open: false
}


const modal = createSlice({
    name: "modal",
    initialState,
    reducers: {
        is_opener: (state, action: PayloadAction<state>) => {
            state.is_open = true
            const { title, type, section } = action.payload;
            state.is_open = true;
            state.title = title;  
            state.type = type;  
            state.section = section;  
        },
        is_closer :(state)=>{
            state.is_open = false
        }

    }
})

export default modal.reducer
export const { is_closer , is_opener } = modal.actions