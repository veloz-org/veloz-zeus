export default function RootLayout({
  children,
  pageProps,
}: {
  children: React.ReactNode;
  pageProps: any;
}) {
  return (
    <div className="w-full min-h-screen" suppressHydrationWarning>
      {children}
    </div>
  );
}
