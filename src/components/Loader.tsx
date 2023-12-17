import useTheme from "@/hooks/useTheme";
import { FlexColCenter, FlexRowStartCenter } from "./Flex";
import { Spinner } from "./Spinner";

export function FullPageLoader() {
  const { theme } = useTheme();

  return (
    <FlexColCenter className="w-full min-h-screen dark:bg-dark-100 bg-white-201">
      <FlexRowStartCenter className="w-auto">
        <Spinner size={20} color={theme === "dark" ? "#fff" : "#000"} />
        <p className="text-dark-105 dark:text-white-100 text-[13px] font-ppReg">
          Loading...
        </p>
      </FlexRowStartCenter>
    </FlexColCenter>
  );
}
