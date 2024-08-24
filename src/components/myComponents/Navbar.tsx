"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Navbar = () => {
  const [isUser, setIsUser] = useState<boolean>(false);

  useEffect(() => {
    const user = localStorage.getItem("__session");
    if (user) {
      setIsUser(true);
    } else {
      setIsUser(false);
    }
  }, []); // Empty dependency array means this effect runs only once on mount

  return (
    <div className="flex p-7 text-white items-center justify-between">
      <Link href="/">
        <h1>Better Engineer</h1>
      </Link>
      <ul className="flex">
        <li>
          <Link href={isUser ? "/dashboard" : "/sign-in"}>
            <Button className={`${isUser ? "hidden" : ""}`}>
              Already A User?
            </Button>
          </Link>
        </li>
        <li>
          <Link href={isUser ? "/dashboard" : "/sign-up"}>
            <Button
              className="bg-white text-black rounded-lg"
              variant="outline"
            >
              {isUser ? "Dashboard" : "Get Started"}
            </Button>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
