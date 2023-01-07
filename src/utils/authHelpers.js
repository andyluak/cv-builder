import { signIn } from "next-auth/react";

export const handleSignIn = async () => {
  await signIn("google", {
    redirect: true,
  });
};
