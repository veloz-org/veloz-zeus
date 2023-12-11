"use client";

export default function RootLayout({
  children,
  pageProps,
}: {
  children: React.ReactNode;
  pageProps: any;
}) {
  return (
    <html lang="en">
      <body className="w-full min-h-screen  ">{children}</body>
    </html>
  );
}
