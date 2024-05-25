import Navigation from "@/app/(chat)/_components/navigation/navigation";
const ChatPageLayout = ({children} : {children : React.ReactNode}) => {
    return ( 
        <div className="h-full flex">
            <Navigation />
            <div className="flex-1">
               {children}
            </div>

        </div>
    );
}
 
export default ChatPageLayout;