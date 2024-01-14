import useTheme from "@/hooks/useTheme";
import { FlexColCenter, FlexRowStartCenter } from "./Flex";
import { Spinner } from "./Spinner";

type Props = {
  showText?: boolean;
  text?: string;
};

export function FullPageLoader({ showText, text }: Props) {
  const { theme } = useTheme();

  return (
    <FlexColCenter className="w-full min-h-screen dark:bg-dark-100/30 bg-white-100/30 z-[999] fixed top-0 left-0 backdrop-blur-lg">
      <FlexRowStartCenter className="w-auto">
        <Spinner size={20} color={theme === "dark" ? "#fff" : "#000"} />
        {showText && (
          <p className="text-dark-105 dark:text-white-100 text-[13px] font-ppReg">
            {text ?? "Loading..."}
          </p>
        )}
      </FlexRowStartCenter>
    </FlexColCenter>
  );
}
