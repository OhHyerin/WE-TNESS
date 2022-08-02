import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";

export default function IconTextField ({ iconStart, iconEnd, InputProps, ...props }) {
  return (
    <TextField
      {...props}
      InputProps={{
        ...InputProps,
        startAdornment: iconStart ? (
          <InputAdornment position="start">{iconStart}</InputAdornment>
        ) : null,
        endAdornment: iconEnd ? (
          <InputAdornment position="end">{iconEnd}</InputAdornment>
        ) : null
      }}
    />
  );
};