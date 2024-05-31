"use client";
import AuthCover from "@/app/(auth)/AuthCover";
import { useConvexAuth } from "convex/react";
import { redirect } from 'next/navigation'
const AuthPageLayout = ({children} : {children : React.ReactNode}) => {
    const { isAuthenticated } = useConvexAuth();
    if (isAuthenticated) {
        redirect("/");
    }
    return ( 
        <div className="max-w-full h-full grid grid-cols-12 overflow-hidden font-poppins">
            <AuthCover />
            {children}
        </div>
     );
}
 
export default AuthPageLayout;