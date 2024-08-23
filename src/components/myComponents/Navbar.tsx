import React from "react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <div className="flex p-7 text-white items-center justify-between">
      <h1>Better Engineer</h1>
      <ul>
        <Button> Already A User?</Button>
        <Button className="bg-white "> Get Started</Button>
      </ul>
    </div>
  );
};

export default Navbar;
