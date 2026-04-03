import { TextField, TextFieldProps } from "@mui/material";

export const Input = ({ variant = "outlined", ...props }: TextFieldProps) => {
  return (
    <TextField
      variant={variant}
      {...props}
      sx={{ height: 40, width: 250, my: 3 }}
    />
  );
};

//あとでcolor
