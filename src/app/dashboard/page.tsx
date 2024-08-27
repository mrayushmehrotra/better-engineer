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

  const CardData = ({ botresponse }: { botresponse: string }) => {
    return botresponse.length > 0 ? (
      <Card className="mt-4 bg-gray-800 text-white shadow-lg rounded-lg p-6">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">{data}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]} // Enables support for GFM like tables, strikethrough, etc.
            className="prose dark:prose-invert"
            components={{
              // Customize how elements are rendered
              strong: ({ children }) => (
                <strong className="text-yellow-300 font-bold">
                  {children}
                </strong>
              ),
              a: ({ children, href }) => (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-300 hover:text-blue-200 underline"
                >
                  {children}
                </a>
              ),
              code: ({ inline, children }) =>
                inline ? (
                  <code className="bg-gray-700 text-pink-400 rounded px-1 py-0.5">
                    {children}
                  </code>
                ) : (
                  <pre className="bg-gray-900 text-pink-400 rounded p-4 overflow-x-auto">
                    <code>{children}</code>
                  </pre>
                ),
              ul: ({ children }) => (
                <ul className="list-disc list-inside space-y-1">{children}</ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal list-inside space-y-1">
                  {children}
                </ol>
              ),
              li: ({ children }) => (
                <li className="text-gray-300">{children}</li>
              ),
              p: ({ children }) => <p className="text-gray-200">{children}</p>,
            }}
          >
            {botresponse}
          </ReactMarkdown>
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
        <CardData botresponse={botresponse} />
      )}
    </div>
  );
};

export default Page;
