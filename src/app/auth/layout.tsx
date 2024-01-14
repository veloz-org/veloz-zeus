import TopBar from "@/components/landing/navigations/TopBar";

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <div className="w-full min-h-screen" suppressHydrationWarning>
      <TopBar />
      {children}
    </div>
  );
}
