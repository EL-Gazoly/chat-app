import React from 'react';
import GoogleIcon from '@/assets/auth/google.svg';
import GithubIcon from '@/assets/auth/github.svg';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import * as Clerk from '@clerk/elements/common';

type SocialButtonProps = {
  icon: string;
  altText: string;
  label: "google" | "github";
};

const SocialButton = ({ icon, altText, label }: SocialButtonProps) => {
  return (
    <Clerk.Connection name={label} className="w-full">
      <Button className="w-full flex items-center gap-x-2 capitalize" variant="outline">
        <Image src={icon} alt={altText} />
        <span>{label}</span>
      </Button>
    </Clerk.Connection>
  );
};

const AuthWithSocial = () => {
  return (
    <div className="w-full flex flex-col items-center gap-y-6">
      <SocialButton icon={GoogleIcon} altText="Google icon" label="google" />
      <SocialButton icon={GithubIcon} altText="Github icon" label="github" />
    </div>
  );
};

export default AuthWithSocial;