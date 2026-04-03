import { Header } from "@/components/layouts/Header";
import { OwnerSignupForm } from "@/features/auth/components/Form/OwnerSignupForm";

export default function AuthOwnerSignup() {
  return (
    <>
      <Header />

      <OwnerSignupForm />
    </>
  );
}
