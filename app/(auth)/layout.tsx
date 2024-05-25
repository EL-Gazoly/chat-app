import AuthCover from "../auth/_components/AuthCover";
const AuthPageLayout = ({children} : {children : React.ReactNode}) => {
    return ( 
        <div className="max-w-full h-full grid grid-cols-12 overflow-hidden font-poppins">
            <AuthCover />
            {children}
        </div>
     );
}
 
export default AuthPageLayout;