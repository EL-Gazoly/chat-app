import Navigation from "@/app/(chat)/_components/navigation/navigation";
import { Toaster } from "@/components/ui/sonner"
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
const inter = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const ChatPageLayout = ({children} : {children : React.ReactNode}) => {


    return ( 
        <div className={cn("h-full flex gap-x-6", inter.className)}>
            <div className=" hidden md:flex">
            <Navigation />
            </div>
            <div className="flex-1">
               {children}
               <Toaster />
            </div>

        </div>
    );
}
 
export default ChatPageLayout;