"use client";
import RecievertHeader from "./_components/RecieverHeader";
import ChatPage from "./_components/Chat";
import SendMessage from "./_components/sendMessage";
import { useParams } from "next/navigation";
import { chat, reciever } from "@/types/chat.types";
import ChatInfo from "@/app/(chat)/_components/ChatInfo";
type UserCardProps = {
    width?: number;
    chatId: string;
    chatMembers: any;
    chatInfo: chat;
    reciever: reciever;
  };


const ConversationPage = () => {
    const { conversationId } = useParams() as { conversationId: string };

   
    return ( 
        <div className=" flex-1 w-full h-full z-10">
            <EnhancedConversationPageElement chatId={conversationId} />
        </div>
           
     );
}

const ConversationPageElement = ({chatMembers, chatInfo} : UserCardProps) => {
    return ( 
        <div className="border-r border-border h-full
            flex flex-col pb-6 justify-between items-center
        ">
            <div className=" w-full flex flex-col gap-y-6">
                { chatMembers && chatInfo?.type === "one-to-one" ?
                <RecievertHeader Reciever={chatMembers[0]} />
                : 
                <RecievertHeader name={chatInfo?.name} />   
                }
                
                <ChatPage />
            </div>
            <SendMessage />
        </div>
           
     );
}

const EnhancedConversationPageElement = ChatInfo(ConversationPageElement);
export default ConversationPage;