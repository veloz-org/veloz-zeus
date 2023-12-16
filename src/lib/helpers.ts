"use client";
import React, { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { DataContext } from "@/context/DataContext";
import { useMutation } from "@tanstack/react-query";
import { ResponseData, UserInfo } from "@/types";
import { useSession } from "next-auth/react";
import { getUser } from "@/http/requests";
import toast from "react-hot-toast";

// withAuth HOC is used within DashboardLayout that should only be accessed by authenticated users
export const withAuth = <P extends { children: React.ReactNode }>(
  WrappedComponent: React.ComponentType<P>
) => {
  const Wrapper: React.FC<P> = (props) => {
    const { setUserInfo, userInfo, setGlobalLoadingState, setSubscribedPlans } =
      useContext(DataContext);
    const { status } = useSession();
    const userInfoMutation = useMutation({
      mutationFn: () => getUser(),
    });
    const router = useRouter();

    useEffect(() => {
      if (status === "unauthenticated") {
        // Avoid infinite redirection loop
        const pathname = window.location.pathname;
        if (pathname !== "/auth") {
          router.push("/auth");
        }
      } else {
        if (!userInfo && status === "authenticated") {
          userInfoMutation.mutate();
          setGlobalLoadingState(true);
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status, router]);

    React.useEffect(() => {
      if (userInfoMutation?.error) {
        const data = (userInfoMutation?.error as any)?.response
          ?.data as ResponseData;
        const code = data?.code;
        if (code === "UNAUTHORISED") {
          toast.error("Unauthorised");
          router.push("/auth");
        }
      }
      if (!userInfoMutation?.data?.errorStatus) {
        setGlobalLoadingState(false);
        // fetch user info if none exists and user is logged in
        const reqData = userInfoMutation.data?.data as UserInfo;
        if (reqData && Object.entries(reqData).length > 0) {
          // set subscribed plans
          const planProdIds = reqData.subscriptions?.map(
            (plan: any) => plan.product_id
          );
          setSubscribedPlans(planProdIds);
          setUserInfo(reqData);
        }
      } else {
        setUserInfo(null as any);
        toast.error(
          userInfoMutation.data?.data?.message ?? "Something went wrong"
        );
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
      userInfoMutation.isPending,
      userInfoMutation.data,
      userInfoMutation.error,
      setUserInfo,
    ]);

    const wrappedComponent = React.createElement(WrappedComponent, props);

    return status === "loading" ? null : wrappedComponent;
  };

  return Wrapper;
};

// withoutAuth HOC is used for pages that should not be accessed by authenticated users
export const withoutAuth = <P extends { children: React.ReactNode }>(
  WrappedComponent: React.ComponentType<P>
) => {
  const Wrapper: React.FC<P> = (props) => {
    const { status } = useSession();
    const router = useRouter();

    useEffect(() => {
      // if user is logged in, redirect to dashboard
      if (status === "authenticated") {
        router.push("/app/dashboard");
      }
    }, [status, router]);

    const wrappedComponent = React.createElement(WrappedComponent, props);
    return wrappedComponent;
  };

  return Wrapper;
};
