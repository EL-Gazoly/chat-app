import Navigation from "@/app/(chat)/_components/navigation/navigation";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
const inter = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const ChatPageLayout = ({children} : {children : React.ReactNode}) => {


    return ( 
        <div className={cn("h-full flex gap-x-6", inter.className)}>
            <Navigation />
            <div className="flex-1">
               {children}
            </div>

        </div>
    );
}
 
export default ChatPageLayout;