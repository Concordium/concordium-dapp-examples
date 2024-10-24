"use client";
import BackButton from "@/components/BackButton";
import Second from "@/components/Second";
import Image from "next/image";
import { useEffect, useState } from "react";
import image1 from "../../public/Images/Frame 1958.svg";

export default function Home() {
  const [showLogo, setShowLogo] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLogo(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {showLogo ? (
        <div className="h-screen w-screen flex justify-center items-center bg-[#14181D]">
          <BackButton />
          <Image src={image1} alt="LOGO" width={120} height={120} />
        </div>
      ) : (
        <Second />
      )}
    </div>
  );
  
  //deployement v2
}
