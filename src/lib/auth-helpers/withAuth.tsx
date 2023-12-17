import { FullPageLoader } from "@/components/Loader";
import { DataContext } from "@/context/DataContext";
import useAuthUser from "@/hooks/useAuthUser";
import { useAuth } from "@clerk/nextjs";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useCallback, useContext, useEffect } from "react";

export default function withAuth<P extends { children: React.ReactNode }>(
  Component: React.ComponentType<P>
) {
  const ComponentWithAuth = (props: P) => {
    const { setUserInfo, setGlobalLoadingState, setSubscribedPlans } =
      useContext(DataContext);
    const { data, loading, error, refetch } = useAuthUser(false);

    // next-auth
    // const { status } = useSession();

    // clerk
    const { isLoaded, userId } = useAuth();

    // next-auth
    // useEffect(() => {
    //   if (status !== "loading") {
    //     // Avoid infinite redirection loop
    //     const pathname = window.location.pathname;
    //     if (status === "unauthenticated" && pathname !== "/auth") window.location.href = "/auth";
    //     if (status === "authenticated") refetch();
    //   }
    //   // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [status]);

    // clerk
    useEffect(() => {
      if (isLoaded) {
        // Avoid infinite redirection loop
        const pathname = window.location.pathname;
        if (!userId) window.location.href = "/auth";
        if (userId && pathname !== "/auth") window.location.href = "/auth";
        if (userId) refetch();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoaded, userId]);

    useEffect(() => {
      // next-auth
      // if (status === "authenticated") {
      //   setGlobalLoadingState(loading);
      //   if (data) {
      //     setUserInfo(data);
      //     const planProdIds = data.subscriptions?.map(
      //       (plan: any) => plan.product_id
      //     );
      //     setSubscribedPlans(planProdIds);
      //   }
      // }

      // clerk
      if (userId) {
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
    }, [loading, data, userId]);

    // next-auth
    // if (status === "loading" || loading) return <FullPageLoader />;
    // if (status === "unauthenticated") {
    //   window.location.href = "/auth";
    // }

    // clerk
    if (!isLoaded || loading) return <FullPageLoader />;

    return <Component {...props} />;
  };

  return ComponentWithAuth;
}
