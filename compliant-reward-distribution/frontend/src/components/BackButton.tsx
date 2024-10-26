"use client"
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

export default function BackButton() {
    const router = useRouter()
  return (
    <button
      onClick={() => {
        router.back()
      }}
      className="text-gray-400  absolute p-2 top-[5%] left-[5%] rounded-[8px] bg-[#D4D6DC]/20   hover:text-gray-200 "
    >
      <ArrowLeft size={16} color="#D4D6DC" />
    </button>
  );
}
