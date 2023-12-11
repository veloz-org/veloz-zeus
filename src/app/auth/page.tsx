import {
  FlexColCenter,
  FlexColStart,
  FlexColStartCenter,
} from "@/components/Flex";
import CredentialsAuth from "@/modules/auth/components/Auth/CredentialsAuth";
import React from "react";

function AuthPage() {
  return (
    <FlexColCenter className="w-full h-screen bg-white-300">
      <FlexColStart className="w-full min-w-[350px] max-w-[400px] bg-white-100 shadow-xl ">
        <CredentialsAuth />
      </FlexColStart>
    </FlexColCenter>
  );
}

export default AuthPage;
