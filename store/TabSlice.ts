"use client";
import { createSlice , PayloadAction } from "@reduxjs/toolkit";
interface TabState {
    tab : string
}

const initialState : TabState = {
    tab : "MESSAGE"
}

const tabSlice = createSlice({
    name: "tab",
    initialState,
    reducers: {
        setTab(state, action : PayloadAction<string>) {
            state.tab = action.payload
        }
    }
})
export const { setTab } = tabSlice.actions
export default tabSlice.reducer