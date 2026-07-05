import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

function valuetext(value: number) {
  return `${value}`;
}

export default function RangeSlider({ maxPrice , changeHandler }: { maxPrice: number , changeHandler : (data : number|number[])=>void }) {
  const [value, setValue] = React.useState<number | number[]>([0, 0]);
  useEffect(() => {
    setValue([0, maxPrice || 0]);
  }, []);

  useEffect(()=>{
    changeHandler(value)
  },[value])

  return (
    <Box sx={{ width: "100%" }}>
      <Slider
        getAriaLabel={() => "price range"}
        value={value}
        onChange={(e, newValue: number | number[]) => {
          setValue(newValue);
        }}
        valueLabelDisplay="auto"
        max={maxPrice || 100}
        step={maxPrice ? maxPrice / 100 : 1}
        getAriaValueText={valuetext}
      />
    </Box>
  );
}
