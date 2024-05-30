"use client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { Id } from "@/convex/_generated/dataModel";
import { chat } from "@/types/chat.types";
interface ChatSlice {
    chats: chat;
    status: "idle" | "loading" | "failed" | "success";
    error: string | undefined;
}

const initialState: ChatSlice = {
    chats: {} as chat,
    status: "idle",
    error: undefined
};

const chatSlice = createSlice({
    name: "chat",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getChats.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getChats.fulfilled, (state, action) => {
                state.status = "success";
                state.chats = action.payload as chat;
            })
            .addCase(getChats.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});
export const getChats = createAsyncThunk(
    "getChats",
    async (id : string) => {
        const chats = useQuery(api.chat.getChat, { chatId : id});
        return chats;
    }
);



export default chatSlice.reducer;
