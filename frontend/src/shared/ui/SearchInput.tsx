// import { InputBase, Paper } from "@mui/material";
// import { colors, radius, transitions } from "../styles/tokens";

// export const Input = () => {
//   return (
//     <Paper
//       elevation={0}
//       sx={{
//         display: "flex",
//         alignItems: "center",
//         gap: 1,
//         px: 1.5,
//         py: 1,
//         borderRadius: radius.md,
//         border: `1px solid ${colors.inputBorder}`,
//         backgroundColor: colors.inputBg,
//         color: colors.iconMuted,
//         transition: transitions.backgroundAndBorder,
//         "&:focus-within": {
//           backgroundColor: colors.inputFocusBg,
//         },
//       }}
//     >
//       <SearchIcon />

//       <InputBase
//         value={query}
//         onChange={(event) => setQuery(event.target.value)}
//         placeholder="Поиск..."
//         sx={{
//           width: "100%",
//           fontSize: 15,
//           color: colors.text,
//         }}
//         onFocus={() => setIsFocused(true)}
//         onKeyDown={(event) => {
//           if (event.key === "Enter" && query.trim()) {
//             handleSearch();
//           }
//         }}
//       />
//     </Paper>
//   );
// };

// SearchInput.tsx
import { InputBase, Paper } from "@mui/material";
import SearchIcon from "@shared/assets/icons/icon-search.svg?react";
import { colors, radius, transitions } from "../styles/tokens";

// type SearchInputProps = {
//   value: string;
//   onChange: (value: string) => void;
//   onSearch: () => void;
//   placeholder?: string;
// };

// export const SearchInput = ({
//   value,
//   onChange,
//   onSearch,
//   placeholder = "Поиск...",
// }: SearchInputProps) => {
//   const [isFocused, setIsFocused] = useState(false);
//   const inputRef = useRef<HTMLInputElement>(null);

//   const handleKeyDown = (event: React.KeyboardEvent) => {
//     if (event.key === "Enter" && value.trim()) {
//       onSearch();
//       setIsFocused(false);
//       inputRef.current?.blur();
//     }
//   };

//   return (
//     <Paper
//       elevation={0}
//       sx={{
//         display: "flex",
//         alignItems: "center",
//         gap: 1,
//         px: 1.5,
//         py: 1,
//         borderRadius: radius.md,
//         border: `1px solid ${colors.inputBorder}`,
//         backgroundColor: isFocused ? colors.inputFocusBg : colors.inputBg,
//         color: colors.iconMuted,
//         transition: transitions.backgroundAndBorder,
//       }}
//     >
//       <SearchIcon />

//       <InputBase
//         ref={inputRef}
//         value={value}
//         onChange={(event) => onChange(event.target.value)}
//         placeholder={placeholder}
//         sx={{
//           width: "100%",
//           fontSize: 15,
//           color: colors.text,
//         }}
//         onFocus={() => setIsFocused(true)}
//         onBlur={() => setIsFocused(false)}
//         onKeyDown={handleKeyDown}
//       />
//     </Paper>
//   );
// };
type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  onFocus?: () => void;
  placeholder?: string;
  disabled?: boolean;
  px?: number;
  py?: number;
};

export const SearchInput = ({
  value,
  onChange,
  onSearch,
  onFocus,
  placeholder = "Поиск...",
  disabled = false,
  px = 1.5,
  py = 1,
}: SearchInputProps) => {
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && value.trim()) {
      onSearch();
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        px: px,
        py: py,
        borderRadius: radius.md,
        border: `1px solid ${colors.inputBorder}`,
        backgroundColor: colors.inputBg,
        color: colors.iconMuted,
        transition: transitions.backgroundAndBorder,
        "&:focus-within": {
          backgroundColor: colors.inputFocusBg,
        },
      }}
    >
      <SearchIcon />

      <InputBase
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        sx={{
          width: "100%",
          fontSize: 15,
          color: colors.text,
        }}
        onFocus={onFocus}
        onKeyDown={handleKeyDown}
      />
    </Paper>
  );
};
