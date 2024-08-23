import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="flex p-7 text-white items-center justify-between">
      <Link href="/">
        <h1>Better Engineer</h1>
      </Link>
      <ul>
        <Link href="/sign-in">
          <Button> Already A User?</Button>
        </Link>
        <Link href="/sign-up">
          <Button
            className="bg-white text-black rounded-lg"
            variant={"outline"}
          >
            {" "}
            Get Started
          </Button>
        </Link>
      </ul>
    </div>
  );
};

export default Navbar;
