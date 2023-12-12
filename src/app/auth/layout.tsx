"use client";

export default function RootLayout({
  children,
  pageProps,
}: {
  children: React.ReactNode;
  pageProps: any;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="w-full min-h-screen">{children}</body>
    </html>
  );
}
