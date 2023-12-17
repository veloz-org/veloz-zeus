import { FlexColCenter } from "@/components/Flex";
import { SignIn } from "@clerk/nextjs";
import React from "react";

function ClerkAuth() {
  return (
    <FlexColCenter>
      <SignIn />
    </FlexColCenter>
  );
}

export default ClerkAuth;
