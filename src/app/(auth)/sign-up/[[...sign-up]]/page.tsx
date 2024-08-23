import React from "react";
import { SignUp } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
const page = () => {
  return (
    <div className="flex items-center justify-center glassmorphism-auth h-screen w-full">
      <SignUp
        appearance={{
          baseTheme: dark,
          variables: {
            colorBackground: "#131316",
          },
        }}
      />
    </div>
  );
};

export default page;
