import { FlexColStart } from "@/components/Flex";
import Button from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDataContext } from "@/context/DataContext";
import useAuthUser from "@/hooks/useAuthUser";
import { getUser, updateUserDetails } from "@/http/requests";
import { CurrentUserPlan, ResponseData, UserInfo } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

type UserDetails = {
  email: string;
  username: string;
  full_name: string;
};

function GeneralSettingsTab() {
  const { userInfo, setCurrentPlan, setGlobalLoadingState } = useDataContext();
  const [userDetails, setUserDetails] = useState<UserDetails>({
    email: "",
    username: "",
    full_name: "",
  });
  const { loading, data, refetch } = useAuthUser(true);
  const updateUserDetailsMut = useMutation({
    mutationFn: async (data: any) => await updateUserDetails(data),
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  // check if input value is different from user details
  const hasChanged = (name: any) => {
    const detail = userDetails[name as keyof UserDetails];
    const info = userInfo?.[name as keyof UserInfo];
    if (typeof info === "undefined") return false;
    return detail.toLowerCase() !== (info as string)?.toLowerCase();
  };

  useEffect(() => {
    setUserDetails({
      email: userInfo?.email as string,
      username: userInfo?.username ?? ("" as string),
      full_name: userInfo?.full_name ?? ("" as string),
    });
  }, [userInfo]);

  // user info fetch
  React.useCallback(() => {
    if (data && !loading) {
      setCurrentPlan(data?.subscription ?? null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  //  user info update
  React.useEffect(() => {
    if (updateUserDetailsMut?.error) {
      const data = (updateUserDetailsMut?.error as any)?.response
        ?.data as ResponseData;
      toast.error(data?.message ?? "Something went wrong!.");
    }
    if (updateUserDetailsMut.data) {
      toast.success("Updated.");
      refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    updateUserDetailsMut.data,
    updateUserDetailsMut.isPending,
    updateUserDetailsMut.error,
  ]);

  return (
    <FlexColStart className="w-full h-full relative">
      <FlexColStart className="w-full">
        <h1 className="text-dark-105 dark:text-white-300 font-ppSB text-[15px] ">
          My Details
        </h1>
      </FlexColStart>
      <FlexColStart className="w-full gap-5">
        <FlexColStart className="w-auto">
          <label className="font-ppReg text-white-400 text-[11px]">
            Full Name
          </label>
          <Input
            className="w-full min-w-[350px] text-[12px] font-ppReg dark:bg-dark-102 dark:border-white-300/50 "
            placeholder="Full Name"
            value={userDetails.full_name}
            name={"full_name"}
            onChange={handleInputChange}
            disabled={loading}
          />
        </FlexColStart>
        <FlexColStart className="w-auto">
          <label className="font-ppReg text-white-400 text-[11px]">
            Username
          </label>
          <Input
            className="w-full min-w-[350px] text-[12px] font-ppReg dark:bg-dark-102 dark:border-white-300/50 "
            placeholder="Username"
            value={userDetails.username}
            name={"username"}
            onChange={handleInputChange}
            disabled={loading}
          />
        </FlexColStart>
        <FlexColStart className="w-auto">
          <label className="font-ppReg text-white-400 text-[11px]">Email</label>
          <Input
            className="w-full min-w-[350px] text-[12px] font-ppReg dark:bg-dark-102 dark:border-white-300/50 "
            placeholder="Email"
            value={userDetails.email}
            name={"email"}
            onChange={handleInputChange}
            // disabled={(userInfo?.email as string)?.length > 0}
          />
        </FlexColStart>
        <FlexColStart>
          <Button
            className="w-full h-[40px] py-0 disabled:bg-blue-101/40 disabled:text-white-100"
            intent={"primary"}
            disabled={
              !hasChanged("full_name") &&
              !hasChanged("username") &&
              !hasChanged("email")
            }
            onClick={() => updateUserDetailsMut.mutate(userDetails)}
            isLoading={updateUserDetailsMut.isPending}
          >
            <span className="text-[12px] font-ppReg">Update Changes</span>
          </Button>
        </FlexColStart>
      </FlexColStart>
    </FlexColStart>
  );
}

export default GeneralSettingsTab;
