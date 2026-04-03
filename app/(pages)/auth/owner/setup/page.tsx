import { Header } from "@/components/layouts/Header";
import { OwnerSetupForm } from "@/features/auth/components/Form/OwnerSetupForm";

export default function AuthOwnerSetup() {
  return (
    <>
      <Header />

      <OwnerSetupForm />
    </>
  );
}
