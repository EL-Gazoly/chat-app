import ConversationInfo from "@/app/(chat)/conversations/[conversationId]/_components/conversationInfo";
const ConversationIdLayout = ({children} : {children : React.ReactNode}) => {
    return ( 
        <div className=" flex h-full w-full">
            {children}
            <ConversationInfo />
        </div>
     );
}
 
export default ConversationIdLayout;