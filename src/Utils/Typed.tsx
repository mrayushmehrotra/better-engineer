"use client";
import React from "react";
import Typewriter from "typewriter-effect";

type Props = {};

const TypewriterTitle = (props: Props) => {
  return (
    <Typewriter
      options={{
        loop: true,
      }}
      onInit={(typewriter) => {
        typewriter
          .typeString("Companion")
          .pauseFor(1000)
          .deleteAll()
          .typeString(" Engineer.")
          .start();
      }}
    />
  );
};

export default TypewriterTitle;
