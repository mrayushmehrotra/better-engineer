import { NextResponse, NextRequest } from "next/server";

export default function POST(req: NextRequest, res: NextResponse) {
  const apiUrl =
    "https://generativelanguage.googleapis.com/v1beta3/models/text-bison-001:generateText";

  const requestData = {
    prompt: {
      text: `Act as the best teacher in the world. I'm giving you the subtitle of a YouTube video, understand it, and I'll ask some questions about it: ${inputText}`,
    },
    temperature: 0.25,
    top_k: 40,
    top_p: 0.95,
    candidate_count: 1,
  };

  const headers = {
    "Content-Type": "application/json",
  };
  try {
    const response = await axios.post(
      `${apiUrl}?key=${PALM_API_KEY}`,
      requestData,
      {
        headers,
      }
    );

    if (response.status === 200) {
      const botResponse = response.data.candidates[0]?.output;
      if (botResponse) {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            id: prevMessages.length + 1,
            text: inputText,
            sender: "user",
            timestamp: Date.now(),
          },
          {
            id: prevMessages.length + 2,
            text: botResponse,
            sender: "bot",
            timestamp: Date.now(),
          },
        ]);
      } else {
        console.error("Response structure error");
      }
    } else {
      console.error("Google Cloud API Error");
    }
  } catch (error) {
    console.error("Error generating text:", error);
  }
}
