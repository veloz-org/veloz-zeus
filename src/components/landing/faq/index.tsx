import {
  FlexColCenter,
  FlexColStart,
  FlexRowStart,
  FlexRowStartBtw,
} from "@/components/Flex";
import { FAQ_DATA } from "@/data/landing/faq";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";
import React from "react";

function FAQ() {
  return (
    <FlexColCenter className="w-full h-full border-t-[1px] border-t-white-300 dark:border-t-white-600 py-9 pb-9 mb-8">
      <h1 className="text-3xl font-ppSB text-dark-100 dark:text-white-100">
        Frequently Asked Questions
      </h1>
      <br />
      <FlexColCenter className="w-full max-w-[75%] mx-auto">
        <FlexColStart className="w-full border-[1px] border-white-300/40 rounded-md">
          {FAQ_DATA.map((f, i) => (
            <FAQDropdown
              key={f.key}
              _key={f.key}
              question={f.question}
              answer={f.answer}
            />
          ))}
        </FlexColStart>
      </FlexColCenter>
    </FlexColCenter>
  );
}

export default FAQ;

type FAQDropdownProps = {
  question: string;
  answer: string;
  _key: string;
};

function FAQDropdown({ question, answer, _key }: FAQDropdownProps) {
  const [activeFaq, setActiveFaq] = React.useState<string[]>([]);

  return (
    <FlexColStart className="w-full">
      <FlexColStart className="w-full border-b-[1px] border-b-white-300/20 dark:border-b-white-600">
        <button
          className="w-full px-8 py-4"
          onClick={() => {
            if (activeFaq.includes(_key)) {
              setActiveFaq(activeFaq.filter((d) => d !== _key));
            } else {
              setActiveFaq([...activeFaq, _key]);
            }
          }}
        >
          <FlexRowStartBtw>
            <span className="text-white-100 font-ppReg text-md">
              {question}
            </span>
            {activeFaq.includes(_key) ? (
              <ChevronUp
                size={15}
                className="dark:text-white-200 text-dark-100"
              />
            ) : (
              <ChevronDown
                size={15}
                className="dark:text-white-200 text-dark-100"
              />
            )}
          </FlexRowStartBtw>
        </button>
        {/* answer */}
        <FlexColStart
          className={cn(
            "w-full h-auto px-8 overflow-hidden transition-all",
            activeFaq.includes(_key) ? "h-auto py-4" : "h-0"
          )}
        >
          <span className="text-white-300 font-ppL text-sm">{answer}</span>
        </FlexColStart>
      </FlexColStart>
    </FlexColStart>
  );
}
