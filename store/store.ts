"use client";
import { configureStore  } from "@reduxjs/toolkit"
import  TabReducer  from "./TabSlice"

export const store = configureStore({
    reducer: {
        tabs: TabReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch