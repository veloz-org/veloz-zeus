"use client";
import {
  FlexColCenter,
  FlexColStart,
  FlexColStartCenter,
} from "@/components/Flex";
import CredentialsAuth from "@/components/auth/nextAuth/CredentialsAuth";
import OAuth from "@/components/auth/nextAuth/OAuth";
import { withoutAuth } from "@/lib/auth-helpers/withoutAuth";
import React from "react";

function AuthPage() {
  return (
    <FlexColCenter className="w-full h-screen">
      <FlexColStart className="w-full min-w-[350px] max-w-[400px] ">
        {/* Replace your prefer auth component */}
        <OAuth />
        <CredentialsAuth />
      </FlexColStart>
    </FlexColCenter>
  );
}

// prevent user to access this page if they are already logged in
export default withoutAuth(AuthPage);
