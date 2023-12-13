import { FlexColStart } from "@/components/Flex";
import { DataContext } from "@/context/DataContext";
import React, { useContext } from "react";

function SubscriptionTab() {
  const { userInfo } = useContext(DataContext);
  return (
    <FlexColStart className="w-full h-full">
      <FlexColStart className="w-full">
        <p className="text-dark-100 font-ppSB text-[12px] ">Plan</p>
        {userInfo.role === "admin" && (
          <p className="text-white-400 font-ppReg text-[13px] ">
            You currently dont have a plan.
            <button className="text-dark-100 font-ppSB underline ml-1">
              Create Plan
            </button>
          </p>
        )}
      </FlexColStart>
    </FlexColStart>
  );
}

export default SubscriptionTab;
