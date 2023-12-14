import React from "react";
import Modal from "./Modal";
import { FlexColCenter } from "./Flex";

// show pricing modal on dashboard when upgrade button is clicked.
function PricingPlanModal() {
  return (
    <Modal isOpen className="fixed bg-dark-100">
      <FlexColCenter className="w-full min-h-screen">
        <h1 className="text-white-100">Pricing Plan</h1>
      </FlexColCenter>
    </Modal>
  );
}

export default PricingPlanModal;
