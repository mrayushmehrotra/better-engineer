"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LiaTelegram } from "react-icons/lia";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";

const CardData = ({ botresponse }: { botresponse: string }) => {
  return botresponse.length > 0 ? (
    <Card className="mt-4">
      <CardContent>
        <p>{botresponse}</p>
      </CardContent>
    </Card>
  ) : (
    <div className="flex flex-col space-y-3 mt-4">
      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
};

const Page = () => {
  const [data, setData] = useState("");
  const [botresponse, setBotResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInput = async () => {
    if (!data.trim()) return; // Prevent API call if input is empty

    setLoading(true);
    try {
      const res = await axios.post("/api/gemini", {
        prompt: data,
      });
      setBotResponse(res.data.data);
    } catch (error) {
      console.error("Error fetching bot response:", error);
      setBotResponse("There was an error processing your request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main p-6 sm:p-12 container mx-auto">
      <Button
        className="bg-white text-black hover:text-white"
        variant="outline"
        onClick={() => {
          console.log("CreditsDrawer button clicked");
        }}
      >
        Open Credits Drawer
      </Button>

      <div className="mt-6">
        <Input
          className="border border-white text-white p-2 text-[1rem] w-full"
          value={data}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleInput();
            }
          }}
          onChange={(e) => setData(e.target.value)}
          placeholder="Enter your prompt here"
        />
        <Button
          variant="outline"
          className="bg-white text-black hover:text-white p-4 mt-4"
          onClick={handleInput}
        >
          Generate &nbsp; <LiaTelegram style={{ scale: 1.5 }} />
        </Button>
      </div>

      {loading ? (
        <Skeleton className="h-[125px] w-[250px] rounded-xl mt-4" />
      ) : (
        <CardData botresponse={botresponse} />
      )}
    </div>
  );
};

export default Page;
