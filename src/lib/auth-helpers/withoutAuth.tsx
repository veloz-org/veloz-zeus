import { DataContext } from "@/context/DataContext";
import useAuthUser from "@/hooks/useAuthUser";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";

export function withoutAuth<P extends { children: React.ReactNode }>(
  Component: React.ComponentType<P>
) {
  const ComponentWithAuth = (props: P) => {
    // next-auth
    const { status } = useSession();

    useEffect(() => {
      if (status !== "loading") {
        if (status === "authenticated") {
          window.location.href = "/auth";
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status]);

    if (status === "loading") return null; // decide to show a full-page loading component

    return <Component {...props} />;
  };

  return ComponentWithAuth;
}
