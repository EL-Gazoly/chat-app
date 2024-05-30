import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { Id } from "@/convex/_generated/dataModel";
type chatMebmers =  {
    _id: Id<"chatMembers">;
    _creationTime: number;
    userId: string;
    chatId: string;
    JoinedAt: number;
}[] | undefined

interface membersSlice {
    members: chatMebmers;
    status: "idle" | "loading" | "failed" | "success";
    error: string | undefined;
}
const initialState: membersSlice = {
    members: [],
    status: "idle",
    error: undefined
};

// Create the slice
const membersSlice = createSlice({
    name: "members",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getChatMembers.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getChatMembers.fulfilled, (state, action: PayloadAction<chatMebmers>) => {
                state.status = "success";
                state.members = action.payload;
            })
    },
});
export const getChatMembers = createAsyncThunk(
    "getChatMembers",
    async (id : Id<"chat">) => {
        const chatMembers = useQuery(api.chat.getChatMembers, { chatId : id});
        return chatMembers;
    }
)

export default membersSlice.reducer;