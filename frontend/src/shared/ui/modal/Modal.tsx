import type { ReactNode } from "react";
import { Box } from "@mui/material";
import type { SxProps, Theme } from "@mui/material";
import { createPortal } from "react-dom";
import { useLockBodyScroll } from "../../hooks/useLockBodyScroll";
import { alphaColors } from "../../styles/tokens";

type ModalPlacement = "center" | "top";

type ModalProps = {
  children: ReactNode;
  onClose: () => void;
  placement?: ModalPlacement;
  zIndex?: number;
  sx?: SxProps<Theme>;
};

export const Modal = ({
  children,
  onClose,
  placement = "center",
  zIndex = 1300,
  sx,
}: ModalProps) => {
  useLockBodyScroll();

  return createPortal(
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        zIndex,
        display: "flex",
        justifyContent: "center",
        alignItems: placement === "center" ? "center" : "flex-start",
        pt: placement === "top" ? { xs: 0, sm: 5 } : 0,
        backgroundColor: alphaColors.overlay,
        ...sx,
      }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      {children}
    </Box>,
    document.body,
  );
};
