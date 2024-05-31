import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";

import FileLink from "./FileLink";
type ChatPageProps = {
    chatId : string
    messageRef: React.RefObject<HTMLDivElement>
}
const ChatPage = ({ chatId, messageRef } : ChatPageProps) => {
    const { user } = useUser();
    const messages = useQuery(api.message.getMessages, { chatId: chatId });
    const sortedMessages = messages?.sort((a, b) => a.createdAt - b.createdAt);

    useEffect(() => {
        messageRef.current?.scrollIntoView();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [messages]);
    
    return (
        <div className="flex flex-col p-4 overflow-y-auto overflow-x-hidden">
        {sortedMessages?.map((message, index) => {
            const isUserMessage = message.senderId === user?.id;
            const isPreviousMessageSameSender = index > 0 && sortedMessages[index - 1].senderId === message.senderId;
            const gap = isPreviousMessageSameSender ? '2px' : '16px';

            return (
                <div 
                    key={message.messageId} 
                    className={cn(
                        "max-w-[calc(50%-8px)] p-2 rounded-xl break-words",
                        isUserMessage ? "self-end bg-brand-primary text-white" : "self-start bg-[#F1F1F1] text-black"
                    )}
                    style={{ marginTop: gap }}
                >
                    {
                        message.content.startsWith('https://files.edgestore.dev/booewrmqgmudz2lk/publicFiles') ? 
                            <FileLink content={message.content} />
                        :
                        <p>{message.content}</p>
                    }
                   
                </div>
            );
        })}
        <div ref={messageRef} />
    </div>
);
    
};

export default ChatPage;
