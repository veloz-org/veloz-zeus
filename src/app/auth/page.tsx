"use client";
import {
  FlexColCenter,
  FlexColStart,
  FlexColStartCenter,
} from "@/components/Flex";
import { withoutAuth } from "@/lib/helpers";
import CredentialsAuth from "@/modules/auth/components/nextAuth/CredentialsAuth";
import { useSession } from "next-auth/react";
import React from "react";

function AuthPage() {
  const { status } = useSession();

  if (status === "loading" || status === "unauthenticated") return null;

  return (
    <FlexColCenter className="w-full h-screen bg-white-300 dark:bg-dark-100">
      <FlexColStart className="w-full min-w-[350px] max-w-[400px] bg-white-100 ">
        {/* Replace your prefer auth component */}
        <CredentialsAuth />
      </FlexColStart>
    </FlexColCenter>
  );
}

// prevent user to access this page if they are already logged in
export default withoutAuth(AuthPage);
