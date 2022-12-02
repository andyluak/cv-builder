import Link from "next/link";
import React from "react";

import Logo from "public/logo.svg";
import Hamburger from "public/hamburger.svg";

function Navbar() {
  return (
    <header>
      <div className="flex items-center justify-between p-4 px-8 md:p-8 lg:p-12">
        <Link href="/">
          <Logo className="h-20 w-20 fill-accent" />
        </Link>

        <nav className="hidden md:block">
          <ul className="flex items-center gap-8">
            <li> <Link href="/dashboard">Home</Link> </li>
            <li> <Link href="/dashboard">Dashboard</Link> </li>
          </ul>
        </nav>

        <Hamburger className="h-8 w-8 md:hidden fill-accent text-accent" />
      </div>
    </header>
  );
}

export default Navbar;
