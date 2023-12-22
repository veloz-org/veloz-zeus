"use client";

import { DataContext } from "@/context/DataContext";
import { useRouter } from "next/navigation";
import { useContext } from "react";

// protect component from unauthorized users
export function OnlyAdmin({ children }: { children: React.ReactNode }) {
  const { userInfo } = useContext(DataContext);
  if (userInfo?.role !== "admin") return null;
  return children;
}

export function OnlyAdminHOF<P extends { children: React.ReactNode }>(
  Component: React.ComponentType<P>
) {
  const ComponentWithAuth = (props: P) => {
    const { userInfo } = useContext(DataContext);
    const router = useRouter();
    if (userInfo?.role !== "admin") {
      router.push("/app/dashboard");
      return null;
    }
    return <Component {...props} />;
  };
  return ComponentWithAuth;
}
