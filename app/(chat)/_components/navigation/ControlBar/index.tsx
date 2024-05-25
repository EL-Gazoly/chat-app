import Logo from "@/assets/logo-Icon.svg";
import ArchiveIcon from "./ArchiveIcon";
import MessageIcon from "./MessageIcon";
import SearchIcon from "./SearchIcon";
import SettingsIcon from "./SettingsIcon";
import Image from "next/image";
import { useReducer } from "react";

type State = {
    isArchive: boolean;
    isMessage: boolean;
    isSearch: boolean;
}

type Action = {
    type: "ARCHIVE" | "MESSAGE" | "SEARCH";
}

const reducer = (state: State, action: Action) => {
    switch (action.type) {
        case "ARCHIVE":
            return {
                isArchive: true,
                isMessage: false,
                isSearch: false
            }
        case "MESSAGE":
            return {
                isArchive: false,
                isMessage: true,
                isSearch: false
            }
        case "SEARCH":
            return {
                isArchive: false,
                isMessage: false,
                isSearch: true
        }
        default:
            return state;
    }

}

const NavigationControlBar = () => {
    const [state, dispatch] = useReducer(reducer, {
        isArchive: false,
        isMessage: true,
        isSearch: false
    
    });
    return ( 
        <div className=" w-[88px] h-full flex flex-col  justify-between items-center py-6 bg-white">
            <div className=" flex flex-col items-center gap-y-10">
                <Image src={Logo} alt="logo" className="  w-10 h-12 lg:w-12 lg:h-14" />
                <div className="flex flex-col items-center gap-y-10">
                    <div className=" cursor-pointer" onClick={ () => dispatch({ type: "MESSAGE" })}>
                        <MessageIcon color={state.isMessage ? "#0D4EC8" : "black"} />
                    </div>
                    <div className=" cursor-pointer" onClick={ () => dispatch({ type: "ARCHIVE" })}>
                        <ArchiveIcon color={state.isArchive ? "#0D4EC8" : "black"} />
                    </div>
                    <div className=" cursor-pointer" onClick={ () => dispatch({ type: "SEARCH" })}>
                        <SearchIcon   color={state.isSearch ? "#0D4EC8" : "black"} />
                    </div>
                </div>
            </div>
              <SettingsIcon  color="black"/>

        </div>
     );
}
 
export default NavigationControlBar;