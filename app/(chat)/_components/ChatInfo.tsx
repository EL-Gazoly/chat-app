"use client";
import React, { ReactNode } from "react";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { Id } from "@/convex/_generated/dataModel";
import { useUser } from "@clerk/clerk-react";
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '@/store/store';
import { getChatMembers } from "@/store/membersSlice";
import { getChats } from "@/store/ChatSlice";
import { chat, chatMembers, reciever } from "@/types/chat.types";

type ChatInfoProps = {
    chatId: string;
    width?: number;
    chat? : chat;
}

type ChildProps = {
   width?: number;
    chatMembers: chatMembers;
    messages: any;
    chatInfo: any;
    chatId: string;
    reciever : reciever;
}

const ChatInfo = (WrappedComponent: React.FC<ChildProps>): React.FC<ChatInfoProps> => {
   
    const ChatInfoComponent: React.FC<ChatInfoProps> = ({ chatId, width }) => {
        const dispatch = useDispatch<AppDispatch>();
        const user = useUser();
        const id = chatId as Id<"chat">;
        dispatch(getChatMembers(id));
        dispatch(getChats(chatId));

        const chatMembers = useSelector((state: RootState) => state.members.members)?.filter((member) => member.userId !== user?.user?.id);
        const messages = useQuery(api.message.getMessages, { chatId: chatId });
        const chatInfo = useSelector((state: RootState) => state.chat.chats);
        const reciever = useQuery(api.users.getUserById, { id: chatMembers ? chatMembers[0]?.userId : "" }) as reciever;
        return (
            <WrappedComponent 
                chatId={chatId} 
                chatMembers={chatMembers} 
                messages={messages} 
                chatInfo={chatInfo}
                width={width}
                reciever={reciever}
            />
        )
    }

    return ChatInfoComponent;
}

export default ChatInfo;
