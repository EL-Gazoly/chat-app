import React from 'react';
import LogoIcon from '@/assets/logo-Icon.svg';
import LogoText from '@/assets/corporatica.svg';
import { Separator } from '@/components/ui/separator';
import AuthWithSocial from '@/components/FormWrapper/AuthWithSocial';
import BackButton from './BackButton';
import Image from 'next/image';

type FormWrapperProps = {
    children: React.ReactNode;
    headerLabel: string;
    backButtonText: string;
    backButtonLabel: string;
    backButtonHref: string;
};

const FormWrapper = ({
    children,
    headerLabel,
    backButtonText,
    backButtonLabel,
    backButtonHref,
}: FormWrapperProps) => {
    return (
        <div className="col-span-12 lg:col-span-5 xl:col-span-4 w-full h-screen flex items-center justify-center">
            <div className="flex flex-col justify-center items-center max-w-[360px]">
                <LogoSection />
                <h4 className="text-lg md:text-xl font-semibold leading-7">{headerLabel}</h4>
                <div className="w-full mt-2">{children}</div>
                    <div className="w-full my-8 grid grid-cols-3 items-center gap-x-2 text-xs text-center font-medium">
                        <Separator />
                        <span>Or sign in with</span>
                        <Separator />
                    </div>
                 <AuthWithSocial />
                <BackButton text={backButtonText} label={backButtonLabel} href={backButtonHref} />
            </div>
        </div>
    );
};

const LogoSection = () => (
    <div className="flex items-center flex-col gap-y-4">
        <Image src={LogoIcon} alt="brand logo" className="w-14 h-[60px] md:w-[70px] md:h-20" />
        <Image src={LogoText} alt="brand name" className="w-48 h-12 md:h-16" />
    </div>
);

export default FormWrapper;
