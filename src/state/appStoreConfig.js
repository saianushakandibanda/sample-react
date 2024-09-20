import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./todoSlice";
import recipesReducer from "./recipesSlice"

const appStore = configureStore({
    reducer : {
        todo : todoReducer,
        recipe : recipesReducer
    }
});

export default appStore;