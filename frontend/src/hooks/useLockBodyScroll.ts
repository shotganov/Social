import { useEffect } from "react";

export const useLockBodyScroll = () => {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;

    document.documentElement.classList.add("modal-open");
    document.body.style.overflow = "hidden";

    return () => {
      document.documentElement.classList.remove("modal-open");
      document.body.style.overflow = previousOverflow;
    };
  }, []);
};
