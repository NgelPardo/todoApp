import { configureStore } from "@reduxjs/toolkit";
import { todoSlice, uiSlice } from "./";

export const store = configureStore({
    reducer: {
        todo: todoSlice.reducer,
        ui: uiSlice.reducer
    }
})