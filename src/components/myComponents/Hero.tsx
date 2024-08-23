import React from "react";
import { Button } from "@/components/ui/button";
import Typed from "@/Utils/Typed";
import { FaArrowRight } from "react-icons/fa";
const Hero = () => {
  return (
    <main className="flex text-white max-h-screen flex-col items-center justify-between p-24 overflow-hidden  ">
      <h1 className="text-8xl m-4 font-  ">
        An <span>AI</span>
      </h1>
      <h1 className="text-8xl mt-2 text-center">
        <Typed />
      </h1>
      <Button
        className="bg-white p-5  mt-10 text-black rounded-sm"
        variant={"outline"}
      >
        Get Started &nbsp; <FaArrowRight />
      </Button>
    </main>
  );
};

export default Hero;
