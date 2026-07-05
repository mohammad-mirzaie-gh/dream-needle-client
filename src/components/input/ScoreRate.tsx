import React from "react";
import Rating from "@mui/material/Rating";
import { MdStarOutline } from "react-icons/md";

export default function BasicRating({rate}:{rate : number}) {
  return (
      <Rating
        name="read-only"
        value={rate}
        readOnly
        size="small"
        emptyIcon={
          <MdStarOutline
            color="gray"
          />
        }
      />
  );
}
