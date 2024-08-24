import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json(); // Await the JSON parsing
    const { prompt } = reqBody;

    if (!prompt) {
      return NextResponse.json(
        {
          success: false,
          message: "Prompt is required.",
        },
        { status: 400 }
      );
    }

    const apiUrl =
      "https://generativelanguage.googleapis.com/v1beta3/models/text-bison-001:generateText";

    const PALM_API_KEY = process.env.PALM_API_KEY;

    const requestData = {
      prompt: {
        text: `Act as a senior software engineer from Google and break down the message problems I'm giving you here: ${prompt}. Give me different components/files which can be used in this prompt.`,
      },
      temperature: 0.25,
      top_k: 40,
      top_p: 0.95,
      candidate_count: 1,
    };

    const headers = {
      "Content-Type": "application/json",
    };

    const response = await axios.post(
      `${apiUrl}?key=${PALM_API_KEY}`,
      requestData,
      { headers }
    );

    if (response.status === 200) {
      const botResponse = response.data.candidates[0]?.output;
      return NextResponse.json(
        {
          success: true,
          data: botResponse,
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Failed to generate text.",
        },
        { status: response.status }
      );
    }
  } catch (error) {
    console.error("Error generating text:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while processing the request.",
      },
      { status: 500 }
    );
  }
}
