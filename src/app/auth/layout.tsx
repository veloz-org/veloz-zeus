export default function RootLayout({
  children,
  pageProps,
}: {
  children: React.ReactNode;
  pageProps: any;
}) {
  return (
    <div className="w-full min-h-screen" suppressHydrationWarning>
      <p className="text-white-100 font-ppReg">HEYY</p>
      {children}
    </div>
  );
}
