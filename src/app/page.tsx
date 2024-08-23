import Navbar from "@/components/myComponents/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex text-white min-h-screen flex-col items-center justify-between p-24"></main>
    </>
  );
}
