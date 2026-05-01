import { useEffect } from "react";

export const useLockBodyScroll = () => {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.documentElement.classList.add("modal-open");
    document.body.style.overflow = "hidden";
    const scrollBarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    if (scrollBarWidth > 0) {
      document.body.style.paddingRight = `${scrollBarWidth}px`;
      document.documentElement.style.paddingRight = `${scrollBarWidth}px`;
    }

    return () => {
      document.documentElement.classList.remove("modal-open");
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = "";
      document.documentElement.style.paddingRight = "";
    };
  }, []);
};
