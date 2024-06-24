import React from "react";

import { useSlideOverContext } from "@/contexts/slideOverContext";
import { CloseButton } from "./close-button";

interface SlideOverProps {
  id: string;
  width?: number;
  children?: React.ReactNode;
}

export function SlideOver({ id, children, width = 380 }: SlideOverProps) {
  const { slideOvers, setSlideOver } = useSlideOverContext();
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    if (slideOvers[id]) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [slideOvers]);

  const handleClose = () => {
    setSlideOver(id, false);
  };

  return (
    <div
      className={`fixed top-0 left-0 w-full h-screen bg-[#0000009e] z-[100] transition-opacity duration-300 ${
        slideOvers[id] ? "opacity-100" : "opacity-0"
      } ${isVisible ? "visible" : "invisible"}`}
      onClick={handleClose}
    >
      <div
        className={`absolute top-0 right-0 h-full max-h-full overflow-y-auto p-5 max-[500px]:w-full bg-white transition-transform duration-300 ${
          slideOvers[id] ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
        style={{ width: `${width}px` }}
      >
        <div className="flex justify-end">
          <CloseButton onClick={handleClose} />
        </div>

        <div className="mt-3">{children}</div>
      </div>
    </div>
  );
}
