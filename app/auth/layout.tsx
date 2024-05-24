import AuthCover from "@/app/auth/_components/AuthCover";

type AuthPagesWrapperProps = {
    children: React.ReactNode;
};

const AuthPagesWrapper = ({ children }: AuthPagesWrapperProps) => {
    return (
        <div className="max-w-full h-full grid grid-cols-12 overflow-hidden font-poppins">
            <AuthCover />
            {children}
        </div>
    );
};

export default AuthPagesWrapper;
