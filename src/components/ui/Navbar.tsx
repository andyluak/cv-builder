import Link from "next/link";
import React from "react";

import Hamburger from "public/hamburger.svg";
import Logo from "public/logo.svg";

function Navbar() {
  return (
    <header>
      <div className="flex items-center justify-between p-4 px-8 md:p-8 lg:p-12">
        <Link href="/">
          <Logo className="h-20 w-20 fill-accent" />
        </Link>

        <nav className="hidden md:block">
          <ul className="flex items-center gap-8">
            <li>
              {" "}
              <Link href="/">Home</Link>{" "}
            </li>
            <li>
              {" "}
              <Link href="/dashboard">Dashboard</Link>{" "}
            </li>
          </ul>
        </nav>

        <Hamburger className="h-8 w-8 fill-accent text-accent md:hidden" />
      </div>
    </header>
  );
}

export default Navbar;
