import React from "react";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

export default function Final() {
  return (
    <div className="relative w-screen h-screen">
      <Image
        src="/Images/Slide 16_9 - 13.svg"
        alt="image"
        layout="fill"
        className=" w-screen h-screen object-cover"
      />
      <div className="absolute inset-0 flex flex-col mt-[20%] justify-center items-center text-center max-w-[339px] mx-auto">
        <h1 className="text-white text-[40px] font-medium mb-4">
          You&apos;re <br />  awesome !
        </h1>
        <p className="text-white mb-6">
          We will check your submission and send the reward straight to your
          wallet. In the meantime stay updated with the latest from Concordium on
          X.
        </p>
        <button className="flex items-center bg-white text-black p-3 rounded-3xl">
          Concordium on X <ArrowLeft className="-rotate-180 ml-2" />
        </button>
      </div>
    </div>
  );
}
