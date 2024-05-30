"use client";
import Logo from "@/assets/logo-Icon.svg";
import ArchiveIcon from "./ArchiveIcon";
import MessageIcon from "./MessageIcon";
import SearchIcon from "./SearchIcon";
import SettingsIcon from "./SettingsIcon";
import Image from "next/image";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { Authenticated, Unauthenticated } from "convex/react";
import { useSelector , useDispatch} from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { setTab } from "@/store/TabSlice"
type Action = {
    type: "ARCHIVE" | "MESSAGE" | "SEARCH";
}

const NavigationControlBar = () => {
    const tab = useSelector((state: RootState) => state.tabs.tab)
    const dispatch = useDispatch<AppDispatch>();
    const handleTab = (tab: Action) => {
        dispatch(setTab(tab.type))
    }

    return ( 
        <div className=" overflow-y-hidden h-full z-10 min-w-[88px] flex flex-col  justify-between items-center py-6 bg-white"
            style={{
                boxShadow: "0px 0px 24px 0px rgba(0, 0, 0, 0.08)"
            }}
        >
            <div className=" flex flex-col items-center gap-y-10">
                <Image src={Logo} alt="logo" className="  w-10 h-12 lg:w-12 lg:h-14" />
                <div className="flex flex-col items-center gap-y-10">
                    <div className=" cursor-pointer" onClick={ () => handleTab({ type: "MESSAGE" })}>
                        <MessageIcon color={tab === "MESSAGE" ? "#0D4EC8" : "black"} />
                    </div>
                    <div className=" cursor-pointer" onClick={ () => handleTab({ type: "ARCHIVE" })}>
                        <ArchiveIcon color={tab === "ARCHIVE" ? "#0D4EC8" : "black"} />
                    </div>
                    <div className=" cursor-pointer" onClick={ () => handleTab({ type: "SEARCH" })}>
                        <SearchIcon   color={tab === "SEARCH"? "#0D4EC8" : "black"} />
                    </div>
                </div>
            </div>
           
                <div className=" cursor-pointer z-[999999]">
                    <Authenticated>
                        <UserButton />
                    </Authenticated>
                    <Unauthenticated>
                        <SignInButton />
                    </Unauthenticated>
                </div>

        </div>
     );
}
 
export default NavigationControlBar;