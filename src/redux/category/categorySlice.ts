import { category as category_type , property as property_type} from "@/type";
import { createSlice } from "@reduxjs/toolkit";
import {
  create_category,
  get_all_category,
  get_one_category,
  edit_one_category,
  get_one_property,
  get_all_property,
  update_property,
  create_property,
} from "./action";
interface state {
  categories: "loading" | null | category_type[];
  category: "loading" | null | category_type;
  properties: "loading" | null | property_type[];
  property: "loading" | null | property_type;
}

const initialState: state = {
  categories: "loading",
  category: "loading",
  properties: "loading",
  property: "loading",
};

const category = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (build) => {
    build
      .addCase(get_all_category.pending, (state) => {
        state.categories = "loading";
      })
      .addCase(get_all_category.fulfilled, (state, action) => {
        state.categories = action.payload.data;
      })
      .addCase(get_all_category.rejected, (state, action) => {
        state.categories = null;
      })
      .addCase(create_category.fulfilled, (state, action) => {
        state.categories = action.payload.new_data.data;
      })
      .addCase(create_category.rejected, (_, action) => {
      })
      .addCase(get_one_category.pending, (state, action) => {
        state.category = "loading";
      })
      .addCase(get_one_category.fulfilled, (state, action) => {
        state.category = action.payload.data;
      })
      .addCase(get_one_category.rejected, (_, action) => {
      })
      .addCase(edit_one_category.fulfilled, (state, action) => {
        state.categories = action.payload.new_data.data;
      })
      .addCase(edit_one_category.rejected, (_, action) => {
      })
      .addCase(get_all_property.pending, (state, action) => {
        state.properties = "loading" 
      })
      .addCase(get_all_property.fulfilled, (state, action) => {
        state.properties = action.payload.data;
      })
      .addCase(get_all_property.rejected, (state, action) => {
        state.properties = null 
      })
      .addCase(get_one_property.pending, (state, action) => {
        state.property = "loading" 
      })
      .addCase(get_one_property.fulfilled, (state, action) => {
        state.property = action.payload.data;
      })
      .addCase(get_one_property.rejected, (state, action) => {
        state.property = null 
      })
      .addCase(update_property.fulfilled, (state, action) => {
        state.property = action.payload.data;
      })
      .addCase(update_property.rejected, (state, action) => {
      })
      .addCase(create_property.fulfilled, (state, action) => {
        state.properties = action.payload.data.data
      })
      .addCase(create_property.rejected, (state, action) => {
      });
  },
});

export default category.reducer;
export const {} = category.actions;
