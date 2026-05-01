import { Box, ButtonBase } from "@mui/material";
import { useState } from "react";
import XIcon from "@public/icon-x.svg?react";
import { Modal, ModalContent } from "@shared/ui";
import { alphaColors, colors, radius, transitions } from "@shared/styles";

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
  const [selectedReason, setSelectedReason] = useState("");

  return (
    <Modal placement="top" onClose={onClose}>
      <ModalContent
        width={560}
        maxWidth={{ xs: "100vw", sm: "calc(100vw - 32px)" }}
        height={{ xs: "100vh", sm: "min(760px, calc(100vh - 80px))" }}
        sx={{
          borderRadius: { xs: 0, sm: radius.lg },
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
            borderBottom: `1px solid ${colors.border}`,
          }}
        >
          <ButtonBase
            onClick={onClose}
            sx={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              color: colors.textSoft,
              transition: transitions.background,
              "&:hover": {
                backgroundColor: colors.hoverBg,
              },
            }}
          >
            <Box component={XIcon} sx={{ width: 22, height: 22 }} />
          </ButtonBase>

          <Box sx={{ fontSize: 22, fontWeight: 700, color: colors.text }}>
            На что вы жалуетесь?
          </Box>
        </Box>

        <Box
          sx={{
            height: 3,
            width: "34%",
            flexShrink: 0,
            backgroundColor: colors.accent,
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
          <Box
            sx={{
              mb: 2,
              fontSize: 16,
              lineHeight: 1.5,
              color: colors.textMuted,
            }}
          >
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
                    borderRadius: radius.md,
                    color: colors.text,
                    transition: transitions.background,
                    "&:hover": {
                      backgroundColor: colors.hoverBg,
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
                        ? `7px solid ${colors.accent}`
                        : `2px solid ${colors.iconMuted}`,
                      flexShrink: 0,
                      transition:
                        "border-color 180ms ease, border-width 180ms ease",
                    }}
                  />
                </ButtonBase>
              );
            })}
          </Box>
        </Box>

        <Box
          sx={{
            p: 2,
            flexShrink: 0,
            borderTop: `1px solid ${colors.border}`,
            boxShadow: alphaColors.bottomBarShadow,
          }}
        >
          <ButtonBase
            disabled={!selectedReason}
            sx={{
              width: "100%",
              height: 56,
              borderRadius: radius.pill,
              backgroundColor: selectedReason
                ? colors.accent
                : colors.disabledBg,
              color: selectedReason ? colors.surface : colors.textSoft,
              fontSize: 16,
              fontWeight: 700,
              transition: transitions.background,
              "&:hover": {
                backgroundColor: selectedReason
                  ? colors.accentHover
                  : colors.disabledBg,
              },
              "&.Mui-disabled": {
                color: colors.textSoft,
              },
            }}
          >
            Пожаловаться
          </ButtonBase>
        </Box>
      </ModalContent>
    </Modal>
  );
};
