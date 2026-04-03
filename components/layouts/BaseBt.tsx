"use client";

import { Button } from "@mui/material";

type Props = {
  onClick: () => void;
  title: string;
};

export const BaseBt = ({ onClick, title }: Props) => {
  return (
    <Button variant="contained" onClick={onClick}>
      {title}
    </Button>
  );
};
