import { Box } from "@mui/material";

type Props = {
  src: string;
  size: number;
};

export const Avatar = ({ src, size }: Props) => {
  return (
    <>
      <Box
        component="img"
        src={src}
        alt="avatar"
        sx={{ flexShrink: 0, width: size, height: size }}
      />
    </>
  );
};
