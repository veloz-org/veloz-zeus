import { FullPageLoader } from "@/components/Loader";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";

export function withoutAuth<P>(Component: React.ComponentType<P>) {
  const ComponentWithAuth = (props: P & any) => {
    const { status } = useSession();

    useEffect(() => {
      if (status !== "loading") {
        if (status === "authenticated") {
          window.location.href = "/auth";
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status]);

    if (status === "loading") return <FullPageLoader />;

    return <Component {...props} />;
  };

  return ComponentWithAuth;
}
