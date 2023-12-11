"use client";
import { FlexColStart, FlexRowCenter, FlexRowStart } from "@/components/Flex";
import Button from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

function CredentialsAuth() {
  const [activeTab, setActiveTab] = React.useState<"signin" | "signup">(
    "signup"
  );

  return (
    <FlexColStart className="w-full px-4">
      {activeTab === "signin" ? <SignInComp /> : <SignupComp />}
      <FlexRowStart className="w-full gap-1 pb-6">
        <span className="text-white-400 text-[12px] font-ppReg px-2 ">
          {activeTab === "signin"
            ? "Dont have an account?"
            : "Already have an account?"}
        </span>
        <span
          onClick={() =>
            setActiveTab(activeTab === "signin" ? "signup" : "signin")
          }
          className="text-dark-100 font-ppReg underline text-[12px] cursor-pointer"
        >
          {activeTab === "signin" ? " Sign-up" : " Sign-in"}
        </span>
      </FlexRowStart>
    </FlexColStart>
  );
}

export default CredentialsAuth;

function SignInComp() {
  return (
    <FlexColStart className="w-full relative px-3 py-4">
      <FlexRowCenter className="w-full grid grid-cols-3">
        <span className="p-[.5px] w-full bg-white-400/30"></span>
        <span className="text-white-400 w-full text-center text-[12px] font-ppReg">
          Sign-in
        </span>
        <span className="p-[.5px] w-full bg-white-400/30"></span>
      </FlexRowCenter>
      <FlexColStart className="w-full">
        <label className="text-white-400 font-ppReg text-[12px] ">Email</label>
        <Input
          name="email"
          placeholder="Email"
          className="bg-white-300 placeholder:text-white-400 text-dark-200 font-jbSB border-solid border-[.5px] border-white-400 px-5 "
        />
      </FlexColStart>
      <FlexColStart className="w-full">
        <label className="text-white-400 font-ppReg text-[12px] ">
          Password
        </label>
        <Input
          name="username"
          type="password"
          placeholder="Password"
          className="bg-white-300 placeholder:text-white-400 text-dark-200 font-jbSB border-solid border-[.5px] border-white-400 px-5 "
        />
        <Button intent={"dark"} className="w-full ">
          <span className="font-ppReg text-white-100 text-[13px] ">
            Sign-in
          </span>
        </Button>
      </FlexColStart>
    </FlexColStart>
  );
}

function SignupComp() {
  return (
    <FlexColStart className="w-full relative px-3 py-4">
      <FlexRowCenter className="w-full grid grid-cols-3">
        <span className="p-[.5px] w-full bg-white-400/30"></span>
        <span className="text-white-400 w-full text-[12px] font-ppReg">
          Create Account
        </span>
        <span className="p-[.5px] w-full bg-white-400/30"></span>
      </FlexRowCenter>
      <FlexColStart className="w-full">
        <label className="text-white-400 font-ppReg text-[12px] ">Email</label>
        <Input
          name="email"
          placeholder="Email"
          className="bg-white-300 placeholder:text-white-400 text-dark-200 font-jbSB border-solid border-[.5px] border-white-400 px-5 "
        />
      </FlexColStart>
      <FlexColStart className="w-full">
        <label className="text-white-400 font-ppReg text-[12px] ">
          Username
        </label>
        <Input
          name="username"
          placeholder="Username"
          className="bg-white-300 placeholder:text-white-400 text-dark-200 font-jbSB border-solid border-[.5px] border-white-400 px-5 "
        />
      </FlexColStart>
      <FlexColStart className="w-full">
        <label className="text-white-400 font-ppReg text-[12px] ">
          Password
        </label>
        <Input
          name="username"
          type="password"
          placeholder="Password"
          className="bg-white-300 placeholder:text-white-400 text-dark-200 font-jbSB border-solid border-[.5px] border-white-400 px-5 "
        />
        <Button intent={"dark"} className="w-full ">
          <span className="font-ppReg text-white-100 text-[13px] ">
            Create Account
          </span>
        </Button>
      </FlexColStart>
    </FlexColStart>
  );
}
