"use client";

import { Button } from "@mui/material";

type Props = {
  onClick?: () => void;
  title: string;
  type: "button" | "submit" | "reset";
};

export const BaseBt = ({ onClick, title, type }: Props) => {
  return (
    <Button variant="contained" onClick={onClick} type={type}>
      {title}
    </Button>
  );
};
