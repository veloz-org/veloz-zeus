import { FlexColCenter } from "@/components/Flex";
import { SignIn, SignUp } from "@clerk/nextjs";
import React from "react";

function ClerkAuth() {
  return (
    <FlexColCenter>
      <SignUp />
    </FlexColCenter>
  );
}

export default ClerkAuth;
