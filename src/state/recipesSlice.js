import { createSlice } from "@reduxjs/toolkit";

const recipesSlice = createSlice({
  name: "recipes",
  initialState: {
    recipes: [],
    error: null,
    status: "idle",
  },
  reducers: {
    getRecipies: (state) => {
      state.status = "loading";
    },
    getRecipesSuccess: (state, action) => {
      state.status = "success";
      state.recipes = action.payload;
    },
    getRecipiesFailure: (state, action) => {
      state.status = "failure";
      state.recipes = [];
      state.error = action.payload;
    },
  },
});
export const { getRecipesSuccess, getRecipies, getRecipiesFailure } =
  recipesSlice.actions;
export default recipesSlice.reducer;
