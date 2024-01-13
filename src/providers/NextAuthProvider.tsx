import { SessionProvider } from "next-auth/react";

interface Props {
  children: React.ReactNode;
}

export default function NextAuthProvider({ children }: Props) {
  return <SessionProvider>{children}</SessionProvider>;
}
