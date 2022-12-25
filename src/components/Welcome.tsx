import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

import Button from "./ui/Button";

function Welcome() {
  const { data: session } = useSession();

  const handleSignIn = async () => {
    await signIn("google", {
      redirect: true,
    });

    // If you want to redirect the user to a specific page after signing in,
    // you can pass the url to the `redirect` option:
  };
  if (session) {
    return (
      <div className="flex flex-col gap-8">
        Signed in as {session?.user?.email} <br />
        <Button variant="primary" size="lg" onClick={() => signOut()}>
          Sign out
        </Button>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center gap-4 bg-white p-10">
      <p>Not signed in</p>
      <Button variant="primary" size="lg" onClick={() => handleSignIn()}>
        Sign in
      </Button>
    </div>
  );
}

export default Welcome;
