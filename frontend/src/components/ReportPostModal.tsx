import { Box, ButtonBase } from "@mui/material";
import { useState } from "react";
import { createPortal } from "react-dom";
import XIcon from "../../public/icon-x.svg?react";
import { useLockBodyScroll } from "../hooks/useLockBodyScroll";

type Props = {
  onClose: () => void;
};

const reportReasons = [
  "Спам",
  "Ненависть, оскорбления или травля",
  "Безопасность детей",
  "Призывы к насилию",
  "Жестокие или шокирующие материалы",
  "Незаконные или регулируемые действия",
  "Выдача себя за другого",
  "Материалы сексуального характера",
  "Частный или опубликованный без согласия контент",
  "Самоубийство или самоповреждение",
  "Терроризм или насильственный экстремизм",
  "Нарушение гражданской целостности",
];

export const ReportPostModal = ({ onClose }: Props) => {
  useLockBodyScroll();
  const [selectedReason, setSelectedReason] = useState("");

  return createPortal(
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        zIndex: 1300,
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        pt: { xs: 0, sm: 5 },
        backgroundColor: "rgba(15, 23, 42, 0.8)",
      }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <Box
        sx={{
          width: 560,
          maxWidth: { xs: "100vw", sm: "calc(100vw - 32px)" },
          height: { xs: "100vh", sm: "min(760px, calc(100vh - 80px))" },
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          borderRadius: { xs: 0, sm: 4 },
          border: "1px solid #e2e8f0",
          backgroundColor: "#ffffff",
          boxShadow: "0 20px 60px rgba(15, 23, 42, 0.18)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            px: 1,
            height: 56,
            flexShrink: 0,
            borderBottom: "1px solid #e2e8f0",
          }}
        >
          <ButtonBase
            onClick={onClose}
            sx={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              color: "#334765",
              transition: "background-color 180ms ease",
              "&:hover": {
                backgroundColor: "#f6f8fc",
              },
            }}
          >
            <Box component={XIcon} sx={{ width: 22, height: 22 }} />
          </ButtonBase>

          <Box sx={{ fontSize: 22, fontWeight: 700, color: "#0f172a" }}>
            На что вы жалуетесь?
          </Box>
        </Box>

        <Box
          sx={{
            height: 3,
            width: "34%",
            flexShrink: 0,
            backgroundColor: "#2563ff",
          }}
        />

        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            px: { xs: 3, sm: 3 },
            py: 2,
          }}
        >
          <Box sx={{ mb: 2, fontSize: 16, lineHeight: 1.5, color: "#64748b" }}>
            Выберите категорию, которая лучше всего описывает проблему.
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column" }}>
            {reportReasons.map((reason) => {
              const active = selectedReason === reason;

              return (
                <ButtonBase
                  key={reason}
                  onClick={() => setSelectedReason(reason)}
                  sx={{
                    width: "100%",
                    px: 2,
                    minHeight: 58,
                    justifyContent: "space-between",
                    gap: 2,
                    textAlign: "left",
                    borderRadius: 3,
                    color: "#0f172a",
                    transition: "background-color 180ms ease",
                    "&:hover": {
                      backgroundColor: "#f6f8fc",
                    },
                  }}
                >
                  <Box sx={{ fontSize: 16, fontWeight: 700 }}>{reason}</Box>
                  <Box
                    sx={{
                      width: 24,
                      height: 24,
                      borderRadius: "50%",
                      border: active
                        ? "7px solid #2563ff"
                        : "2px solid #8FA1BF",
                      flexShrink: 0,
                      transition:
                        "border-color 180ms ease, border-width 180ms ease",
                    }}
                  />
                </ButtonBase>
              );
            })}
          </Box>

          <Box sx={{ mt: 3, fontSize: 15, lineHeight: 1.5, color: "#334765" }}>
            Вы можете узнать больше о правилах и дополнительных вариантах
            отправки жалоб в{" "}
            <Box component="span" sx={{ color: "#2563ff", fontWeight: 500 }}>
              центре помощи
            </Box>
            .
          </Box>
        </Box>

        <Box
          sx={{
            p: 2,
            flexShrink: 0,
            borderTop: "1px solid #e2e8f0",
            boxShadow: "0 -8px 24px rgba(15, 23, 42, 0.08)",
          }}
        >
          <ButtonBase
            disabled={!selectedReason}
            sx={{
              width: "100%",
              height: 56,
              borderRadius: 999,
              backgroundColor: selectedReason ? "#2563ff" : "#cbd5e1",
              color: selectedReason ? "#ffffff" : "#334765",
              fontSize: 16,
              fontWeight: 700,
              transition: "background-color 180ms ease",
              "&:hover": {
                backgroundColor: selectedReason ? "#1d4ed8" : "#cbd5e1",
              },
              "&.Mui-disabled": {
                color: "#334765",
              },
            }}
          >
            Пожаловаться
          </ButtonBase>
        </Box>
      </Box>
    </Box>,
    document.body,
  );
};
