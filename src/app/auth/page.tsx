"use client";
import { FlexColCenter, FlexColStart } from "@/components/Flex";
import CredentialsAuth from "@/components/auth/nextAuth/CredentialsAuth";
import OAuth from "@/components/auth/nextAuth/OAuth";
import { withoutAuth } from "@/lib/auth-helpers/withoutAuth";
import { useSearchParams } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

function AuthPage() {
  const errorParams = useSearchParams().get("error");

  React.useEffect(() => {
    if (errorParams) {
      if (errorParams === "OAuthAccountNotLinked") {
        toast.error("Email already exists, not linked with Google.");
      } else {
        toast.error("Something went wrong, please try again.");
      }
    }
  }, [errorParams]);

  return (
    <FlexColCenter className="w-full h-screen">
      <FlexColStart className="w-full min-w-[350px] max-w-[400px] scale-[.90] md:scale-[1] ">
        {/* Replace your prefer auth component */}
        <OAuth />
        <CredentialsAuth />
      </FlexColStart>
    </FlexColCenter>
  );
}

// prevent user to access this page if they are already logged in
export default withoutAuth(AuthPage);
