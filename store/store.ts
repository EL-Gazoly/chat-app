"use client";
import { configureStore  } from "@reduxjs/toolkit"
import  TabReducer  from "./TabSlice"
import ChatSlice from "./ChatSlice";
import membersSlice from "./membersSlice";
export const store = configureStore({
    reducer: {
        tabs: TabReducer,
        chat: ChatSlice,
        members: membersSlice

    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch