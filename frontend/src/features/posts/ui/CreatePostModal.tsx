import {
  Box,
  ClickAwayListener,
  TextareaAutosize,
  IconButton,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import EmojiPicker, { type EmojiClickData } from "emoji-picker-react";
import { useImmer } from "use-immer";
import SocialIcon from "@public/icon-social.svg?react";
import EmojiIcon from "@public/icon-emoji-gray.svg?react";
import IconImg from "@public/icon-image-gray.svg";
import XIcon from "@public/icon-x.svg?react";
import {
  CharacterCounter,
  Modal,
  ModalActionButton,
  ModalContent,
} from "@shared/ui";
import { alphaColors, colors, radius, transitions } from "@shared/styles";

type Props = {
  setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
};

export const CreatePostModal = ({ setIsEdit }: Props) => {
  const imageBlobUrlsRef = useRef<string[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const [images, setImages] = useImmer<string[]>([]);
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setText((prev) => prev + emojiData.emoji);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    imageBlobUrlsRef.current.push(url);
    setImages((draft: string[]) => {
      draft.push(url);
    });
  };

  const handleRemoveImage = (index: number) => {
    setImages((draft: string[]) => {
      const removed = draft[index];
      if (removed) {
        URL.revokeObjectURL(removed);
        imageBlobUrlsRef.current = imageBlobUrlsRef.current.filter(
          (url) => url !== removed,
        );
      }
      draft.splice(index, 1);
    });
  };

  const handleSendPost = (text: string) => {
    if (
      (text.trim().length === 0 && images.length === 0) ||
      text.trim().length > 300
    )
      return;
  };

  useEffect(() => {
    textareaRef.current?.focus();
    return () => {
      imageBlobUrlsRef.current.forEach((url: string) => {
        URL.revokeObjectURL(url);
      });
    };
  }, []);

  return (
    <Modal
      placement="top"
      zIndex={10}
      onClose={() => setIsEdit(false)}
      sx={{
        pt: 5.7,
      }}
    >
      <ModalContent
        width={600}
        maxWidth="100vw"
        maxHeight="90vh"
        sx={{
          overflowY: "auto",
          border: "none",
          p: 1.5,
          pt: 2,
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 1,
          }}
        >
          <ModalActionButton
            variant="secondary"
            onClick={() => setIsEdit(false)}
          >
            Отменить
          </ModalActionButton>

          <ModalActionButton
            variant="primary"
            onClick={() => {
              handleSendPost(text);
              setIsEdit(false);
            }}
            disabled={text.trim().length === 0 || text.trim().length > 300}
          >
            Опубликовать
          </ModalActionButton>
        </Box>

        <Box
          sx={{
            background: colors.surface,
            display: "flex",
            flexDirection: "column",
            p: 2,
            paddingBottom: 1,
            borderRadius: radius.lg,
            gap: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              position: "relative",
              gap: 2,
              width: "calc(100% + 54px)",
              mx: -3.5,
              backgroundColor: colors.inputBg,
              borderTop: `1px solid ${colors.inputBorder}`,
              borderBottom: `1px solid ${colors.inputBorder}`,
              minHeight: "240px",
              transition: transitions.background,
              "&:focus-within": {
                backgroundColor: colors.inputFocusBg,
              },
            }}
          >
            <Box
              sx={{
                flexShrink: 0,
                position: "absolute",
                left: 12,
                top: 10,
              }}
            >
              <SocialIcon width={48} height={48} />
            </Box>

            <TextareaAutosize
              minRows={1}
              maxRows={10}
              ref={textareaRef}
              placeholder="Написать пост..."
              style={{
                width: "100%",
                boxSizing: "border-box",
                padding: "12px 16px",
                paddingLeft: "70px",
                outline: "none",
                resize: "none",
                color: colors.text,
                font: "inherit",
                fontSize: "17px",
                lineHeight: 1.2,
              }}
              value={text}
              onChange={(e) => setText(e.target.value)}
            />

            <Box
              sx={{
                mt: 1,
                p: 2,
                pb: 1,
                width: "100%",
                display: "grid",
                gridAutoFlow: "column",
                gridAutoColumns:
                  images.length === 1 ? "minmax(0, 250px)" : "minmax(0, 1fr)",
                gap: 2,
              }}
            >
              {images.map((elem: string, index: number) => (
                <Box
                  key={index}
                  sx={{
                    position: "relative",
                    width: "100%",
                    aspectRatio: "1 / 1",
                  }}
                >
                  <Box
                    component="img"
                    src={elem}
                    alt="preview"
                    sx={{
                      width: "100%",
                      height: "100%",
                      borderRadius: radius.sm,
                      objectFit: "cover",
                      display: "block",
                    }}
                  />

                  <IconButton
                    onClick={() => handleRemoveImage(index)}
                    sx={{
                      position: "absolute",
                      height: 24,
                      width: 24,
                      p: 0,
                      top: 5,
                      right: 5,
                      background: alphaColors.imageRemoveBg,
                      borderRadius: 10,
                      color: colors.surface,
                      "&:hover": { background: alphaColors.imageRemoveHoverBg },
                    }}
                  >
                    <XIcon width={18} height={18} />
                  </IconButton>
                </Box>
              ))}
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              pt: 1,
              position: "relative",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <IconButton
                disableRipple
                sx={{
                  p: 0,
                  height: "23px",
                  width: "23px",
                  color: colors.textSoft,
                  borderRadius: 2,
                  "&:hover": { backgroundColor: colors.inputFocusBg },
                }}
                onClick={() => setOpen((prev) => !prev)}
              >
                <EmojiIcon height={23} width={23} />
              </IconButton>

              <Box
                component="label"
                htmlFor="image-upload"
                sx={{
                  mr: 0.4,
                  height: "22px",
                  width: "22px",
                  borderRadius: 2,
                  cursor: "pointer",
                  "&:hover": { backgroundColor: colors.inputFocusBg },
                }}
              >
                <Box
                  component="img"
                  src={IconImg}
                  sx={{ display: "block" }}
                ></Box>

                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleFileChange}
                />
              </Box>
            </Box>
            <CharacterCounter value={text.length} max={300} />
          </Box>
          {open && (
            <ClickAwayListener onClickAway={() => setOpen(false)}>
              <Box
                sx={{
                  position: "fixed",
                  left: "48%",
                  top: "25%",
                  transform: "scale(0.8)",
                  transformOrigin: "top center",
                  zIndex: 11,
                }}
              >
                <Box sx={{ transform: "translateX(-50%)" }}>
                  <EmojiPicker
                    previewConfig={{ showPreview: false }}
                    onEmojiClick={handleEmojiClick}
                  />
                </Box>
              </Box>
            </ClickAwayListener>
          )}
        </Box>
      </ModalContent>
    </Modal>
  );
};
