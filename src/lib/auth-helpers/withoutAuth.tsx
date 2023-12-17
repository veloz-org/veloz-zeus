import { FullPageLoader } from "@/components/Loader";
import { DataContext } from "@/context/DataContext";
import { useAuth } from "@clerk/nextjs";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";

export function withoutAuth<P extends { children: React.ReactNode }>(
  Component: React.ComponentType<P>
) {
  const ComponentWithAuth = (props: P) => {
    // next-auth
    // const { status } = useSession();

    // clerk
    const { isLoaded, userId } = useAuth();

    // next-auth
    // useEffect(() => {
    //   if (status !== "loading") {
    //     if (status === "authenticated") {
    //       window.location.href = "/auth";
    //     }
    //   }
    //   // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [status]);

    // clerk
    useEffect(() => {
      if (isLoaded) {
        // prevent infinite redirection loop
        const pathname = window.location.pathname;
        if (userId && pathname !== "/auth") {
          window.location.href = "/auth";
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoaded]);

    // next-auth
    // if (status === "loading") return <FullPageLoader />;

    // clerk
    if (!isLoaded) return <FullPageLoader />;

    return <Component {...props} />;
  };

  return ComponentWithAuth;
}
