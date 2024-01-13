import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
import { X } from "lucide-react";

interface ModalProp {
  isOpen?: boolean;
  onClose?: () => void;
  showCloseIcon?: boolean;
  children?: React.ReactNode;
  isBlurBg?: boolean;
  fixed?: boolean;
  scrollable?: boolean;
  className?: React.ComponentProps<"div">["className"];
}

const Modal = ({
  children,
  isOpen,
  showCloseIcon,
  onClose,
  fixed,
  scrollable,
  isBlurBg,
}: ModalProp) => {
  const [isVisible, setIsVisible] = useState(isOpen);

  React.useEffect(() => {
    setIsVisible(isOpen);
  }, [isOpen]);

  const handleClickOutside = (e: Event) => {
    const tgt = (e.target as any)?.dataset;
    const name = tgt.name;
    name && onClose;
  };

  React.useEffect(() => {
    if (isOpen) {
      document.body.classList.add("modal-open");
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.body.classList.remove("modal-open");
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={twMerge(
        `w-full hideScrollBar bg-dark-100/40 h-[100vh] ${
          fixed ? "fixed z-[250px]" : "absolute"
        } top-0 left-0 z-[50] py-5`,
        isBlurBg ? "backdrop-filter bg-opacity-85" : "",
        scrollable ? "overflow-y-auto hideScollBar" : "overflow-hidden"
      )}
      data-name="main-modal"
    >
      <div className={`${isVisible ? "opacity-100" : "opacity-0"}`}>
        {showCloseIcon && (
          <button
            onClick={onClose}
            className="absolute top-5 right-2 p-1 bg-dark-100/20 rounded-[50%] z-[70]"
          >
            <X size={25} className="cursor-pointer p-1 text-red-305 " />
          </button>
        )}
        <div className="relative w-full h-screen">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
