import { Pagination, Stack } from '@mui/material'
import React from 'react'

interface PaginationProps {
    count: number;
    chande_handler: (event: React.ChangeEvent<unknown>, value: number) => void;
}

function pagination({ count, chande_handler }: PaginationProps) {



    return (
        <Stack spacing={5}>
            <Pagination hideNextButton hidePrevButton onChange={chande_handler} sx={{
                "& .MuiPaginationItem-root": { color: "var(--textColorTheme)", fontFamily: "shabnam", fontWeight: "500", borderRadius: "0px" },
                "& .MuiPaginationItem-root.Mui-selected": {
                    backgroundColor: "transparent !important",
                    color: "rgb(37, 99, 235) !important",
                    border: "1px solid rgb(37, 99, 235)",
                    borderRadius: "50%",
                    fontWeight: "600"
                },
            }} count={count} color="primary" />
        </Stack>)
}

export default pagination