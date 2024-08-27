"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LiaTelegram } from "react-icons/lia";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm"; // To handle GitHub Flavored Markdown like tables, strikethrough, etc.
import CreditsDrawer from "@/components/myComponents/CreditsDrawer";

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
      setLoading(false);
    } catch (error) {
      console.error("Error fetching bot response:", error);
      setLoading(false);
      setBotResponse(
        "There was an error processing your request. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main p-6 sm:p-12 container mx-auto">
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
          className={
            loading
              ? "bg-red text-red-600 hover:text-red-900 p-4 mt-4 "
              : "bg-white text-black hover:text-white p-4 mt-4"
          }
          onClick={handleInput}
          disabled={loading ? true : false}
        >
          {loading ? (
            <h1>Loading..</h1>
          ) : (
            <h1 className="flex">
              Generate &nbsp; <LiaTelegram style={{ scale: 1.5 }} />
            </h1>
          )}
        </Button>
      </div>

      {loading ? (
        <Skeleton className="h-[125px] w-[250px] rounded-xl mt-4" />
      ) : (
        <CreditsDrawer data={data} botresponse={botresponse} />
      )}
    </div>
  );
};

export default Page;
