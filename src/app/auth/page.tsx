"use client";
import {
  FlexColCenter,
  FlexColStart,
  FlexColStartCenter,
} from "@/components/Flex";
import ClerkAuth from "@/components/auth/clerk/ClerkAuth";
import CredentialsAuth from "@/components/auth/nextAuth/CredentialsAuth";
import { withoutAuth } from "@/lib/auth-helpers/withoutAuth";
import React from "react";

function AuthPage() {
  return (
    <FlexColCenter className="w-full h-screen">
      <FlexColStart className="w-full min-w-[350px] max-w-[400px] ">
        {/* Replace your prefer auth component */}
        {/* <CredentialsAuth /> */}
        <ClerkAuth />
      </FlexColStart>
    </FlexColCenter>
  );
}

// prevent user to access this page if they are already logged in
export default withoutAuth(AuthPage);
