"use client";

import React from 'react';
import FormWrapper from '@/components/FormWrapper';
import { Field, Label, Input, FieldError, GlobalError } from '@clerk/elements/common';
import { Root, Step, Action } from '@clerk/elements/sign-in';
import { Button } from '@/components/ui/button';

const LoginForm = () => {
  return (
    <FormWrapper
      headerLabel="Nice to see you again"
      backButtonText="Don’t have an account?"
      backButtonLabel="Sign Up"
      backButtonHref="/sign-up"
    >
      <Root>
        <Step name="start" className="w-[360px] flex flex-col gap-y-4">
          <Field name="identifier">
            <Label className="text-xs">Email</Label>
            <Input
              type="text"
              required
              placeholder="Enter your email"
              className="bg-[#F2F2F2] focus:border-[#4285F4] flex h-12 w-full rounded-md border px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            />
            <FieldError className="mt-2 block text-xs text-rose-400" />
          </Field>
          <Field name="password">
            <Label className="text-xs">Password</Label>
            <Input
              type="password"
              required
              placeholder="Enter your password"
              className="bg-[#F2F2F2] focus:border-[#4285F4] flex h-12 w-full rounded-md border px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            />
            <FieldError className="mt-2 block text-xs text-rose-400" />
          </Field>
          <GlobalError className="bg-destructive/15 p-4 rounded-md flex items-center gap-x-2 text-sm text-destructive" />
          <Action submit className="w-full">
            <Button className="mt-4 w-full">Sign In</Button>
          </Action>
        </Step>
      </Root>
    </FormWrapper>
  );
};

export default LoginForm;
