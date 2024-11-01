import { FlexRowCenter, FlexRowStartCenter } from "@/components/Flex";
import TRUSTED_MAKERS from "@/data/landing/trustedBy";
import Image from "next/image";
import React from "react";

// customer trust components
function TrustedBy() {
  const TRUSTED_CUSTOMERS_COUNT = 100;
  return (
    <FlexRowStartCenter>
      <FlexRowCenter className="w-fit -space-x-5 rtl:space-x-reverse">
        {TRUSTED_MAKERS.map((m, i) => (
          <div
            key={i}
            className="w-fit rounded-full border-[3px] border-dark-100 dark:border-dark-200"
            style={{
              height: "40px",
              width: "40px",
              backgroundImage: `url(${m})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
            }}
          ></div>
        ))}
      </FlexRowCenter>
      <FlexRowCenter>
        <p className=" text-white-400 dark:text-white-300 text-sm font-ppReg">
          Trusted by{" "}
          <span className="font-ppSB text-dark-100 dark:text-white-100">
            {TRUSTED_CUSTOMERS_COUNT}+
          </span>{" "}
          Makers
        </p>
      </FlexRowCenter>
    </FlexRowStartCenter>
  );
}

export default TrustedBy;
