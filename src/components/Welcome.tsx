import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

function Welcome() {
  const { data: session, status } = useSession();

  const handleSignIn = async() => {
    await signIn("google", {
      redirect: true,
    });

    // If you want to redirect the user to a specific page after signing in,
    // you can pass the url to the `redirect` option:

  }
  if (session) {
    return (
      <div>
        Signed in as {session?.user?.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    );
  }
  return (
    <div className="bg-white p-10 flex flex-col items-center gap-4">
      <p>Not signed in</p>
      <button className="text-xl bg-black p-4 text-white" onClick={() => handleSignIn()}>Sign in</button>
    </div>
  );
}

export default Welcome;
