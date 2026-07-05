"use client";

import { Pagination, Stack } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

interface PaginationProps {
  count: number;
  active_page: number;
}

function Pagination_comp({ count, active_page }: PaginationProps) {
    const pathname = usePathname();
    const router = useRouter();
  const navigate_page = (data: number) => {
    const searcher = new URLSearchParams(window.location.search);
    searcher.set("page", String(data));
    const newUrl = `${pathname}?${searcher.toString()}`;
    router.push(newUrl);
  };

  return (
    <Stack spacing={5}>
      <Pagination
        hideNextButton
        hidePrevButton
        page={active_page}
        onChange={(_, data) => {
          navigate_page(data);
        }}
        sx={{
          "& .MuiPaginationItem-root": {
            color: "var(--textColorTheme)",
            fontFamily: "shabnam",
            fontWeight: "500",
            borderRadius: "0px",
          },
          "& .MuiPaginationItem-root.Mui-selected": {
            backgroundColor: "var(--backgroundColorTheme_2) !important",
            color: "rgb(37, 99, 235) !important",
            borderRadius: "8px",
            fontWeight: "600",
          },
        }}
        count={count}
        color="primary"
      />
    </Stack>
  );
}

export default Pagination_comp;
