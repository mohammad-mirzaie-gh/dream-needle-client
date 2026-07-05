"use client";
import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";

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

export default function MultipleSelectChip({
  data,
  title,
  ChangeHandler,
}: {
  data: string[];
  title?: string;
  ChangeHandler: (selects: string[]) => void;
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

  return (
    <div className="w-full bg-backgroundColorTheme_1 flex flex-col justify-center items-center gap-2">
      <label className="text-textColorTheme w-full font-bold text-start">
        {title}
      </label>
      <div className="w-full">
        <FormControl sx={{ width: "100%" }}>
          <Select
            sx={{ borderRadius: "12px" }}
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
              <MenuItem key={index} value={i}>
                {i}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
}
