import { ChevronRight } from "lucide-react";
import { FlexColCenter, FlexRowCenter, FlexRowStartCenter } from "../Flex";
import Button from "../ui/button";

export default function WaitlistFormComponent() {
  return (
    <FlexRowCenter className="w-full">
      <FlexRowStartCenter className="w-fit min-w-[400px] bg-dark-102 rounded-full py-2 px-2 relative border-[3px] border-dark-102 shadow-md scale-[.90] md:scale-[1] ">
        <FlexColCenter className="w-fit absolute left-[3em] top-[-1em] translate-y-1">
          <span className="text-[10px] text-white-100/40 font-ppReg px-2 py-[2px] rounded-full bg-dark-102">
            Email Address
          </span>
        </FlexColCenter>
        <input
          type="text"
          className="w-full px-4 py-2 bg-transparent border-none outline-none placeholder:text-white-300/30 dark:text-white-100 text-dark-100 font-ppReg transition-all text-sm"
          placeholder="Email address"
        />
        <Button
          className="w-auto min-w-[150px] bg-blue-101 hover:bg-blue-101/80 rounded-full translate3-x-4"
          isLoading={false}
        >
          <FlexRowStartCenter className="gap-2">
            <span className="text-white-100 text-sm font-ppSB">Join Now</span>
            <ChevronRight
              size={15}
              className="text-white-100 group-hover:translate-x-2 translate-x-0 transition-all"
            />
          </FlexRowStartCenter>
        </Button>
      </FlexRowStartCenter>
    </FlexRowCenter>
  );
}
