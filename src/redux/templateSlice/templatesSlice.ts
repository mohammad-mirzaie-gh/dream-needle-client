import { color as color_type, size as size_type } from "@/type";
import { createSlice } from "@reduxjs/toolkit";

interface stateProducts {
  size: size_type | {};
  sizes: size_type[] | [];
  color: color_type | {};
  colors: color_type[] | [];
}

const initialState: stateProducts = {
  size: {},
  sizes: [],
  color: {},
  colors: [],
};

const template = createSlice({
  name: "templates",
  initialState,
  reducers: {
    set_color: (state, action) => {
      state.colors = action.payload?.data;
    },
    set_colors: (state, action) => {
      state.colors = action.payload?.data;
    },
    set_size: (state, action) => {
      state.size = action.payload?.data;
    },
    set_sizes: (state, action) => {
      state.sizes = action.payload?.data;
    },
  },
});

export const { set_colors, set_color, set_size, set_sizes } = template.actions;
export default template.reducer;
