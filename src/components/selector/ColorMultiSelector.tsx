"use client";
import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { color } from "@/type";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function ColorMultiSelector({
  data,
  orgData,
  title,
  ChangeHandler,
  prevData
}: {
  data: string[];
  orgData: color[];
  title?: string;
  ChangeHandler: (selects: string[]) => void;
  prevData : string[]
}) {
  const [personName, setPersonName] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === "string" ? value.split(",") : value);
  };

  useEffect(() => {
    ChangeHandler(personName);
  }, [personName]);

  useEffect(()=>{
    if (prevData[0]) {
      setPersonName(prevData)
    }
  },[])

  return (
    <div className="w-full bg-backgroundColorTheme_1 flex flex-col justify-center items-center gap-2">
      <label className="text-textColorTheme w-full font-bold text-start">
        {title}
      </label>
      <div className="w-full">
        <FormControl sx={{ width: "100%"}}>
          <Select
            sx={{ borderRadius: "12px", border: "0px" }}
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            multiple
            value={personName}
            onChange={handleChange}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {data?.map((i, index) => (
              <MenuItem
                key={index}
                style={{ backgroundColor: i }}
                value={
                  orgData.find((i2) => {
                    return i2.color_code === i;
                  })?.title
                }
              >
                <div
                  style={{ backgroundColor: i }}
                  className="w-[25px] h-[25px] rounded-[50%]"
                ></div>
                <span className="mx-2">
                  {
                    orgData.find((i2) => {
                      return i2.color_code === i;
                    })?.title
                  }
                </span>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
}

export default ColorMultiSelector;
