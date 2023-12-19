import { FullPageLoader } from "@/components/Loader";
import { DataContext } from "@/context/DataContext";
import useAuthUser from "@/hooks/useAuthUser";
import { useSession } from "next-auth/react";
import React, { useCallback, useContext, useEffect } from "react";

export default function withAuth<P extends { children: React.ReactNode }>(
  Component: React.ComponentType<P>
) {
  const ComponentWithAuth = (props: P) => {
    const { setUserInfo, setGlobalLoadingState, setSubscribedPlans } =
      useContext(DataContext);
    const { data, loading, error, refetch } = useAuthUser(false);
    const { status } = useSession();

    useEffect(() => {
      if (status !== "loading") {
        // Avoid infinite redirection loop
        const pathname = window.location.pathname;
        if (status === "unauthenticated" && pathname !== "/auth")
          window.location.href = "/auth";
        if (status === "authenticated") refetch();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status]);

    useEffect(() => {
      if (status === "authenticated") {
        setGlobalLoadingState(loading);
        if (data) {
          setUserInfo(data);
          const planProdIds = data.subscriptions?.map(
            (plan: any) => plan.product_id
          );
          setSubscribedPlans(planProdIds);
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading, data, status]);

    if (status === "loading" || loading) return <FullPageLoader />;
    if (status === "unauthenticated") {
      window.location.href = "/auth";
    }

    return <Component {...props} />;
  };

  return ComponentWithAuth;
}
