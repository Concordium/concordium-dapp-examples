import Image from "next/image";
import Link from "next/link";
import BackButton from "./BackButton";

export default function Component() {
  return (
    <div className="min-h-screen bg-[#14181D] text-gray-100  flex flex-col max-[450px]:px-5">
      <BackButton />
      <main className="flex-grow  flex flex-col items-center pt-[116px] ">
        <div className="flex flex-col items-center">
          <h1 className="text-[40px] font-medium text-[#A2CAC1] text-center mb-[32px] font-[family-name:var(--font-satoshi-sans)]">
            Concordium Rewards
          </h1>

          <div className=" relative flex items-center space-x-12 mb-[64px]">
            <div className=" absolute ">
              <Image
                src="/Images/Frame 1983.svg"
                alt="twitter"
                width={74.67}
                height={74.67}
                className="text-gray-900"
              ></Image>
            </div>
            <div className="">
              <Image
                src="/Images/Frame 1984.svg"
                alt="Concordium logo"
                width={74.67}
                height={74.67}
                className="text-gray-300"
              />
            </div>
          </div>

          <div className="">
            <h2 className=" text-xl font-bold  leading-[32px] text-[#A2CAC1] mb-4 font-[family-name:var(--font-satoshi-sans)]">
              Create post on X and get 1,000 CCD:
            </h2>
            <ol className="space-y-[18px] list-decimal list-inside text-[14px] font-normal font-[family-name:var(--font-satoshi-sans)]">
              <li>Connect your wallet</li>
              <li>
                Post about Concordium on X (Twitter) with the #Concordium <br />{" "}
                <span className="ml-[16px]">hashtag</span>
              </li>
              <li>Confirm that you are of eligible age and nationality</li>
            </ol>
          </div>
          <Link href={"/connnectwallet"}>
            <button className="bg-white mt-[140px] w-[239px] h-[56px]  text-gray-900 font-semibold py-3 px-6 rounded-full hover:bg-gray-200 transition-colors">
              Get started
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}
