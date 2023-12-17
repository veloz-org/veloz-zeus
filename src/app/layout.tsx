"use client";
import { ppReg, ppB, ppEB, ppSB, ppL } from "@/config/font";
import "./styles/globals.css";
import NextAuthProvider from "@/providers/NextAuthProvider";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LayoutContextProvider from "@/context/LayoutContext";
import DataContextProvider from "@/context/DataContext";
import NextTopLoader from "@/components/TopLoader";
import useTheme from "@/hooks/useTheme";
import ClerkAuthProvider from "@/providers/ClerkProviders";

// tanstack reqct query
const queryClient = new QueryClient();

export default function RootLayout({
  children,
  pageProps,
}: {
  children: React.ReactNode;
  pageProps: any;
}) {
  // init theme
  useTheme();

  return (
    <html lang="en">
      <head>
        <style jsx global>
          {`
            :root {
              --font-ppReg: ${ppReg.style.fontFamily};
              --font-ppB: ${ppB.style.fontFamily};
              --font-ppEB: ${ppEB.style.fontFamily};
              --font-ppSB: ${ppSB.style.fontFamily};
              --font-ppL: ${ppL.style.fontFamily};
            }
          `}
        </style>
      </head>
      <body
        className="min-h-screen dark:bg-dark-100 bg-white-200"
        suppressHydrationWarning
      >
        <QueryClientProvider client={queryClient}>
          {/* <NextAuthProvider> */}
          <ClerkAuthProvider>
            {/* LayoutContext (Needed for protected routes that need shared layout) */}
            <LayoutContextProvider>
              <DataContextProvider>{children}</DataContextProvider>
            </LayoutContextProvider>
            <Toaster />
          </ClerkAuthProvider>
          {/* </NextAuthProvider> */}
        </QueryClientProvider>

        {/* Show loading state during page navigation */}
        <NextTopLoader color="#3770fe" showSpinner />
      </body>
    </html>
  );
}
