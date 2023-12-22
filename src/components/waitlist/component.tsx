"use client";
import { ChevronRight } from "lucide-react";
import { FlexColCenter, FlexRowCenter, FlexRowStartCenter } from "../Flex";
import Button from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import { addToWaitlist } from "@/http/requests";
import React from "react";
import toast from "react-hot-toast";
import { ResponseData } from "@/types";

export default function WaitlistFormComponent() {
  const [email, setEmail] = React.useState<string>("");
  const addToWaitlistMutation = useMutation({
    mutationFn: async (data: any) => await addToWaitlist(data),
  });

  React.useEffect(() => {
    if (addToWaitlistMutation.error) {
      const errMsg = (addToWaitlistMutation.error as any)?.response?.data
        ?.message;
      toast.error(errMsg);
    }
    if (addToWaitlistMutation.data) {
      const { data } = addToWaitlistMutation.data as ResponseData;
      console.log({ data });
      toast.success("Added to waitlist");
    }
  }, [
    addToWaitlistMutation.data,
    addToWaitlistMutation.error,
    addToWaitlistMutation.isPending,
  ]);

  return (
    <FlexRowCenter className="w-full">
      <FlexRowStartCenter className="w-fit min-w-[400px] bg-white-300 dark:bg-dark-102 rounded-full py-2 px-2 relative border-[3px] border-dark-102 shadow-md scale-[.90] md:scale-[1] ">
        <FlexColCenter className="w-fit absolute left-[3em] top-[-1em] translate-y-1">
          <span className="text-[10px] text-white-100/40 font-ppReg px-2 py-[2px] rounded-full bg-dark-102">
            Email Address
          </span>
        </FlexColCenter>
        <input
          type="text"
          className="w-full px-4 py-2 bg-transparent disabled:opacity-[.5] disabled:text-white-300 disabled:cursor-not-allowed border-none outline-none placeholder:dark:text-white-300/30 dark:text-white-100 placeholder:text-white-400 text-dark-100 font-ppReg transition-all text-sm"
          placeholder="Email address"
          disabled={addToWaitlistMutation.isPending}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button
          className="w-full max-w-[150px] bg-blue-101 hover:bg-blue-101/80 rounded-full translate3-x-4"
          isLoading={addToWaitlistMutation.isPending}
          onClick={() => addToWaitlistMutation.mutate({ email })}
        >
          <FlexRowStartCenter className="gap-2">
            <span className="text-white-100 text-[11px] font-ppSB">
              Join Waitlist
            </span>
            <ChevronRight
              size={15}
              className="text-white-100 group-hover:translate-x-2 translate-x-0 transition-all"
            />
          </FlexRowStartCenter>
        </Button>
      </FlexRowStartCenter>
    </FlexRowCenter>
  );
}
