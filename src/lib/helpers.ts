"use client";
import React, { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { DataContext } from "@/context/DataContext";
import { useQuery } from "@tanstack/react-query";
import { UserInfo } from "@/types";
import { useSession } from "next-auth/react";
import { getUser } from "@/http/requests";

// withAuth HOC is used for pages that should only be accessed by authenticated users
export const withAuth = <P extends { children: React.ReactNode }>(
  WrappedComponent: React.ComponentType<P>
) => {
  const Wrapper: React.FC<P> = (props) => {
    const { setUserInfo, userInfo } = useContext(DataContext);
    const { data, status } = useSession();
    const userInfoQuery = useQuery({
      queryKey: ["userInfo"],
      queryFn: () => getUser(),
      enabled: status === "authenticated",
    });
    const router = useRouter();

    useEffect(() => {
      if (status === "unauthenticated") {
        // Avoid infinite redirection loop
        const pathname = window.location.pathname;
        if (pathname !== "/auth") {
          router.push("/auth");
        }
      }
    }, [status, router]);

    React.useEffect(() => {
      // fetch user info if none exists and user is logged in
      if (!userInfoQuery?.data?.errorStatus) {
        const reqData = userInfoQuery.data?.data as UserInfo;
        if (reqData && Object.entries(reqData).length > 0) {
          setUserInfo(reqData);
        }
      }
    }, [userInfoQuery.isLoading, userInfoQuery.data, userInfoQuery.error]);

    const wrappedComponent = React.createElement(WrappedComponent, props);
    return wrappedComponent;
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
