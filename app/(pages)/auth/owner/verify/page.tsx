import { Header } from "@/components/layouts/Header";
import { OwnerVerifyForm } from "@/features/auth/components/Form/OwnerVerifyForm";

export default function AuthOwnerVerify() {
  return (
    <>
      <Header />

      <OwnerVerifyForm />
    </>
  );
}
