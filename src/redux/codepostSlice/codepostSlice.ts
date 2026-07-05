import { code_post as type_code_post } from "@/type";
import { createSlice } from "@reduxjs/toolkit";
import { get_all_code_post } from "./action";
interface state {
  code_posts: type_code_post[] | "loading" | null;
}

const initialState: state = {
  code_posts: "loading",
};

const code_post = createSlice({
  name: "code_post",
  initialState,
  reducers: {},
  extraReducers(build) {
    build
      .addCase(get_all_code_post.pending, (state) => {
        state.code_posts = "loading";
      })
      .addCase(get_all_code_post.fulfilled, (state, action) => {
        state.code_posts = action.payload.data;
      })
      .addCase(get_all_code_post.rejected, (state, action) => {
        state.code_posts = null;
      });
  },
});

export default code_post.reducer;
export const {} = code_post.actions;
