"use client";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { Authenticated, Unauthenticated } from "convex/react";
export default function Home() {
  return (
      <main>
      <Unauthenticated>
        <SignInButton />
      </Unauthenticated>
      <Authenticated>
        <UserButton />
        <h1>Home</h1>
      </Authenticated>
    </main>
  );
}
