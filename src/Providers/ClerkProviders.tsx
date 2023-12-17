import { ClerkProvider } from "@clerk/nextjs";

interface Props {
  children: React.ReactNode;
}

export default function ClerkAuthProvider({ children }: Props) {
  return <ClerkProvider>{children}</ClerkProvider>;
}
