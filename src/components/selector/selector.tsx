import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

export default function BasicSelect({
  data,
  title,
  ChangeHandler,
  value,
}: {
  title?: string;
  data: string[] | [];
  value: string;
  ChangeHandler: (select: string) => void;
}) {
  const handleChange = (event: SelectChangeEvent) => {
    ChangeHandler(event.target.value as string);
  };

  return (
    <>
      <div className="w-full flex flex-col items-start justify-end gap-2">
        <label className="text-textColorTheme w-full font-bold text-start">
          {title}
        </label>

        <Box sx={{ width: "100%" }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label"></InputLabel>
            <Select
              style={{ height: 45, borderRadius: "10px" }}
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={value}
              label=""
              onChange={handleChange}
            >
              {data?.map((i, index) => (
                <MenuItem value={i} key={index}>
                  {i}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </div>
    </>
  );
}
