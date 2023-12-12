"use client";
import { ppReg, ppB, ppEB, ppSB, ppL } from "@/config/font";
import "./styles/globals.css";
import NextAuthProvider from "@/providers/NextAuthProvider";
import ThemeContextProvider from "@/context/Theme";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// tanstack reqct query
const queryClient = new QueryClient();

export default function RootLayout({
  children,
  pageProps,
}: {
  children: React.ReactNode;
  pageProps: any;
}) {
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
      <body className="min-h-screen" suppressHydrationWarning>
        <QueryClientProvider client={queryClient}>
          <NextAuthProvider>
            <ThemeContextProvider>{children}</ThemeContextProvider>
            <Toaster />
          </NextAuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
