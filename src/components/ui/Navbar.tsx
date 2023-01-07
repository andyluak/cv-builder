import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

import Hamburger from "public/hamburger.svg";
import Logo from "public/logo.svg";

import Button from "./Button";
import { handleSignIn } from "src/utils/authHelpers";

function Navbar() {
  const { data: session } = useSession();
  return (
    <header className="border border-b-secondary">
      <div className="flex items-center justify-between p-4 px-8 md:p-8 lg:p-12">
        <Link href="/">
          <Logo className="h-20 w-20 fill-accent" />
        </Link>
        <nav className="hidden md:block">
          <ul className="flex items-center gap-8">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/dashboard">Dashboard</Link>
            </li>
            <li>
              {session ? (
                <Button variant="primary" size="lg" onClick={() => signOut()}>
                  Sign out
                </Button>
              ) : (
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleSignIn}
                >
                  Sign in
                </Button>
              )}
            </li>
          </ul>
        </nav>

        <Hamburger className="h-8 w-8 fill-accent text-accent md:hidden" />
      </div>
    </header>
  );
}

export default Navbar;
