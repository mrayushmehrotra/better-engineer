"use client";
import React, { useState } from "react";
import CreditsDrawer from "@/components/myComponents/CreditsDrawer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LiaTelegram } from "react-icons/lia";

const Page = () => {
  const [data, setData] = useState("");

  const handleInput = () => {
    alert(`This is an alert message. ${data}  `);
  };

  return (
    <div className="main p-24 container mx-auto">
      <Button
        className="bg-white text-black rounded-lg absolute left-[50%] hover:text-white  "
        variant="outline"
        onClick={() => {
          // Handle drawer opening here if necessary
          console.log("CreditsDrawer button clicked");
        }}
      >
        Open Credits Drawer
      </Button>
      <br />
      <br />
      <br />
      <div>
        <Input
          className="border border-white text-white"
          value={data}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleInput();
            }
          }}
          onChange={(e) => {
            setData(e.target.value);
          }}
        />
        <br />
        <Button
          variant={"outline"}
          className="bg-white text-black
          hover:text-white p-5
          "
          onClick={handleInput}
        >
          Generate &nbsp; <LiaTelegram style={{ scale: 1.5 }} />
        </Button>
      </div>
    </div>
  );
};

export default Page;
