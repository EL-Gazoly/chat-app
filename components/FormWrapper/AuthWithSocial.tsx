import GoogleIcon from '@/assets/auth/google.svg';
import GithubIcon from '@/assets/auth/github.svg';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

type SocialButton = {
    icon: string;
    altText: string;
    label: string;
};


const AuthWithSocial = () => {
    return (
        <div className="w-full flex flex-col items-center gap-y-6">
            <SocialButton icon={GoogleIcon} altText="Google icon" label="Google" />
            <SocialButton icon={GithubIcon} altText="Github icon" label="Github" />
        </div>
    );
};

const SocialButton = ({ icon, altText, label } : SocialButton) => {
    return (
    <Button className="w-full flex items-center gap-x-2" variant="outline">
        <Image src={icon} alt={altText} />
        <span>{label}</span>
    </Button>
);}

export default AuthWithSocial;