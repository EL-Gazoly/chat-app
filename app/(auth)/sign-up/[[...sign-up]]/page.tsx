'use client';

import React from 'react';
import * as Clerk from '@clerk/elements/common';
import * as SignUp from '@clerk/elements/sign-up';
import { Button } from '@/components/ui/button';
import FormWrapper from '@/app/(auth)/_components/FormWrapper';
import { Separator } from '@/components/ui/separator';
import GoogleIcon from '@/assets/auth/google.svg';
import GithubIcon from '@/assets/auth/github.svg';
import Image from 'next/image';
export default function SignUpPage() {
  return (
    <FormWrapper
      headerLabel="Welcome to Our Community!"
      backButtonText="Already have an account?"
      backButtonLabel="Sign In"
      backButtonHref="/sign-in"
    >
      <SignUp.Root>
        <SignUp.Step name="start" className="w-[360px] flex flex-col gap-y-4">
          <Clerk.Field name="emailAddress">
            <Clerk.Label className="text-xs">Email</Clerk.Label>
            <Clerk.Input
              type="text"
              required
              placeholder="Enter your email"
              className="bg-[#F2F2F2] focus:border-[#4285F4] flex h-12 w-full rounded-md border px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            />
            <Clerk.FieldError className="mt-2 block text-xs text-rose-400" />
          </Clerk.Field>
          <Clerk.Field name="password">
            <Clerk.Label className="text-xs">Password</Clerk.Label>
            <Clerk.Input
              type="password"
              required
              placeholder="Enter your password"
              className="bg-[#F2F2F2] focus:border-[#4285F4] flex h-12 w-full rounded-md border px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            />
            <Clerk.FieldError className="mt-2 block text-xs text-rose-400" />
          </Clerk.Field>
          <div className="space-y-4" />
          <Clerk.GlobalError className="bg-destructive/15 p-4 rounded-md flex items-center gap-x-2 text-sm text-destructive" />
          <SignUp.Action submit className="w-full">
            <Button className="w-full mt-4">Sign Up</Button>
          </SignUp.Action>
          <div className="w-full my-8 grid grid-cols-3 items-center gap-x-2 text-xs text-center font-medium">
            <Separator />
            <span>Or sign in with</span>
            <Separator />
          </div>         
           <div className="space-y-2">
              <Clerk.Connection
                name="google"
                className='w-full'
                >
                  <Button className="w-full flex items-center gap-x-2 capitalize" variant="outline">
                    <Image src={GoogleIcon} alt={"google-icon"} />
                    <span>Google</span>
                  </Button>
              </Clerk.Connection>
              <Clerk.Connection
                name="github"
                className='w-full'
                >
                  <Button className="w-full flex items-center gap-x-2 capitalize" variant="outline">
                    <Image src={GithubIcon} alt={"github-icon"} />
                    <span>Github</span>
                  </Button>
              </Clerk.Connection>
            </div>
        </SignUp.Step>

        <SignUp.Step name="verifications" className="w-[360px] flex flex-col gap-y-4">
          <SignUp.Strategy name="email_code">
            <Clerk.Field name="code">
              <Clerk.Label className="text-xs">Email code</Clerk.Label>
              <Clerk.Input
                type="otp"
                required
                className="w-full rounded-md bg-white px-3.5 py-2 text-sm outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-950 data-[invalid]:ring-red-400"
              />
              <Clerk.FieldError className="block text-sm text-red-400" />
            </Clerk.Field>
            <Clerk.GlobalError className="bg-destructive/15 p-4 rounded-md flex items-center gap-x-2 text-sm text-destructive" />
            <SignUp.Action submit className="w-full">
              <Button className="w-full">Verify</Button>
            </SignUp.Action>
          </SignUp.Strategy>
        </SignUp.Step>

        <SignUp.Step name="continue" className="w-[360px] flex flex-col gap-y-4">
          <Clerk.Field name="username" className="space-y-2">
            <Clerk.Label className="text-sm">Username</Clerk.Label>
            <Clerk.Input
              type="text"
              required
              className="w-full rounded-md bg-white px-3.5 py-2 text-sm outline-none ring-1 ring-inset ring-zinc-300 hover:ring-zinc-400 focus:ring-[1.5px] focus:ring-zinc-950 data-[invalid]:ring-red-400"
            />
            <Clerk.FieldError className="block text-sm text-red-400" />
          </Clerk.Field>
          <Clerk.GlobalError className="bg-destructive/15 p-4 rounded-md flex items-center gap-x-2 text-sm text-destructive" />
          <SignUp.Action submit className="w-full">
            <Button className="w-full">Continue</Button>
          </SignUp.Action>
        </SignUp.Step>
      </SignUp.Root>
    </FormWrapper>
  );
}
