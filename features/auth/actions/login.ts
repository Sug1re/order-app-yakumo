import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase/firebase";

export const login = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(auth, email, password);
};