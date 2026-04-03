import { Box } from "@mui/material";
import { Header } from "@/components/layouts/Header";
import { Input } from "@/components/layouts/Input";

export default function OrderLoginPage() {
  return (
    <>
      <Header />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
          height: "90vh",
        }}
      >
        <Input id="store-code" label="お店コード" />
        <Input id="table-number" label="テーブル番号" />
      </Box>
    </>
  );
}
