"use client";
import { ppReg, ppB, ppEB, ppSB, ppL } from "@/config/font";
import "./styles/globals.css";

// main app layout similar to (_app.jsx) page in next (pages)

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
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
      <body className={""}>{children}</body>
    </html>
  );
}
