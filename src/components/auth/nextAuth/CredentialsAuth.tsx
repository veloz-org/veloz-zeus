"use client";
import { FlexColStart, FlexRowCenter, FlexRowStart } from "@/components/Flex";
import Button from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { registerUsers } from "@/http/requests";
import { ResponseData } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import React, { useCallback, useContext, useEffect } from "react";
import toast from "react-hot-toast";

function CredentialsAuth() {
  const [activeTab, setActiveTab] = React.useState<"signin" | "signup">(
    "signin"
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

// SignIn
function SignInComp() {
  const [loading, setLoading] = React.useState(false);
  const [form, setForm] = React.useState({
    email: "",
    password: "",
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const resp = await signIn("credentials", {
      ...form,
      redirect: false,
    });

    setLoading(false);

    if (!resp?.ok) {
      toast.error("Invalid credentials");
      return;
    }

    // redirect to dashboard
    window.location.href = "/dashboard";
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <FlexColStart className="w-full relative px-3 py-4">
        <FlexRowCenter className="w-full grid grid-cols-3">
          <span className="p-[.5px] w-full bg-white-400/30"></span>
          <span className="text-white-400 w-full text-center text-[12px] font-ppReg">
            Sign-in
          </span>
          <span className="p-[.5px] w-full bg-white-400/30"></span>
        </FlexRowCenter>
        <FlexColStart className="w-full">
          <label className="text-white-400 font-ppReg text-[12px] ">
            Email
          </label>
          <Input
            name="email"
            placeholder="Email"
            className="bg-white-300 placeholder:text-white-400 text-dark-200 font-jbSB border-solid border-[.5px] border-white-400 px-5 "
            onChange={handleFormChange}
          />
        </FlexColStart>
        <FlexColStart className="w-full">
          <label className="text-white-400 font-ppReg text-[12px] ">
            Password
          </label>
          <Input
            name="password"
            type="password"
            placeholder="Password"
            className="bg-white-300 placeholder:text-white-400 text-dark-200 font-jbSB border-solid border-[.5px] border-white-400 px-5 "
            onChange={handleFormChange}
          />
          {/* @ts-no-error */}
          <Button
            intent={"dark"}
            className="w-full "
            onClick={handleSubmit as any}
            isLoading={loading}
          >
            <span className="font-ppReg text-white-100 text-[13px] ">
              Sign-in
            </span>
          </Button>
        </FlexColStart>
      </FlexColStart>
    </form>
  );
}

function SignupComp() {
  const [form, setForm] = React.useState({
    username: "",
    email: "",
    password: "",
  });
  const registerMut = useMutation({
    mutationFn: async (data: any) => await registerUsers(data),
  });

  const resetMutation = () => {
    registerMut.reset();
  };

  const registerCallback = useCallback(() => {
    if (registerMut.error) {
      resetMutation();
      const error = (registerMut.error as any)?.response?.data as ResponseData;
      toast.error(error.message);
    }
    if (registerMut.data) {
      resetMutation();
      toast.success("Account created successfully");

      // sign in user
      signIn("credentials", {
        email: form.email,
        password: form.password,
      });
    }
  }, [registerMut.error, registerMut.data, registerMut.isPending]);

  useEffect(() => registerCallback(), [registerCallback]);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // validate form properties
    const { email, username, password } = form;
    if (!email || !username || !password) {
      toast.error("Input can't be empty");
      return;
    }

    registerMut.mutate(form);
  }

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <FlexColStart className="w-full relative px-3 py-4">
        <FlexRowCenter className="w-full grid grid-cols-3">
          <span className="p-[.5px] w-full bg-white-400/30"></span>
          <span className="text-white-400 w-full text-[12px] font-ppReg">
            Create Account
          </span>
          <span className="p-[.5px] w-full bg-white-400/30"></span>
        </FlexRowCenter>
        <FlexColStart className="w-full">
          <label className="text-white-400 font-ppReg text-[12px] ">
            Email
          </label>
          <Input
            name="email"
            placeholder="Email"
            className="bg-white-300 placeholder:text-white-400 text-dark-200 font-jbSB border-solid border-[.5px] border-white-400 px-5 "
            onChange={handleFormChange}
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
            onChange={handleFormChange}
          />
        </FlexColStart>
        <FlexColStart className="w-full">
          <label className="text-white-400 font-ppReg text-[12px] ">
            Password
          </label>
          <Input
            name="password"
            type="password"
            placeholder="Password"
            className="bg-white-300 placeholder:text-white-400 text-dark-200 font-jbSB border-solid border-[.5px] border-white-400 px-5 "
            onChange={handleFormChange}
          />
          <Button
            intent={"dark"}
            className="w-full"
            isLoading={registerMut.isPending}
            onClick={handleSubmit as any}
          >
            <span className="font-ppReg text-white-100 text-[13px] ">
              Create Account
            </span>
          </Button>
        </FlexColStart>
      </FlexColStart>
    </form>
  );
}
