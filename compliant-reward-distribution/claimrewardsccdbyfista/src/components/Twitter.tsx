'use client'
import { Copy } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import BackButton from "./BackButton";
// import axios from 'axios';

export default function SubmitXPost() {
  const ProgressStep = ({
    number,
    active,
  }: {
    number: number;
    active: boolean;
  }) => (
    <div className="flex items-center">
      <div
        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${active
          ? number === 2
            ? "bg-[#ece2cd] text-black" // Step 2 color when active
            : number === 3
              ? "bg-[#b6ade6] text-black" // Step 3 color when active
              : "bg-[#a7f2ec] text-black" // Default active color for other steps
          : "bg-[#7a7a7a] text-black" // Inactive color
          }`}
      >
        {number}
      </div>
      {number < 3 && (
        <div
          className={`h-[2px] w-12 sm:w-24 md:w-32 ${active
            ? number === 2
              ? "bg-[#ece2cd]"
              : number === 3
                ? "bg-[#a7f2ec]" // Step 3 line color when active
                : "bg-[#a7f2ec]"
            : "bg-[#7a7a7a]"
            }`}
        ></div>
      )}
    </div>
  );


  // async function getUserTimeline() {
  //   const url = 'https://api.twitter.com/1.1/statuses/user_timeline.json';  // Corrected base URL

  //   try {
  //     const response = await axios.get(url, {
  //       headers: {
  //         'Authorization': 'Bearer AAAAAAAAAAAAAAAAAAAAALBAwgEAAAAAOjAESM2o6hFRWKR5mgPAqXjtIFY%3DqKv0l8LAFaoUeVARaqCkeq9AaTL7GSmE70m8pxNmHI068LxKiq',
  //         'User-Agent': 'My Twitter App v1.0.23',
  //         'Accept-Encoding': 'gzip',
  //       },
  //       params: {
  //         count: 100,
  //         screen_name: 'twitterapi', // Correct and valid Twitter username
  //       },
  //     });

  //     console.log('User timeline response:', response.data);
  //     return response.data;
  //   } catch (error: any) {
  //     if (error.response) {
  //       // The request was made, and the server responded with a status code not in the 2xx range
  //       console.error('Response error:', error.response.status, error.response.data);
  //     } else if (error.request) {
  //       // The request was made but no response was received
  //       console.error('Request error:', error.request);
  //     } else {
  //       // Something else caused the error
  //       console.error('Error:', error.message);
  //     }
  //     throw error;
  //   }
  // }

  // async function getToken() {
  //   const url = 'https://api.x.com/oauth2/token';
  //   const consumerKey = 'h5otdzFyQeqMuoxYhgSZAcw89';
  //   const consumerSecret = 'TZmg4vnJA6cBmD8t9nFgRvCie11o9mDYrqBizJgCeOEbkVcNEY';
  //   const credentials = `${consumerKey}:${consumerSecret}`;
  //   console.log('credentials:', credentials);
  //   let encodedCredentials = Buffer.from(credentials).toString('base64');
  //   encodedCredentials = "aDVvdGR6RnlRZXFNdW94WWhnU1pBY3c4OTpUWm1nNHZuSkE2Y0JtRDh0OW5GZ1J2Q2llMTFvOW1EWXJxQml6SmdDZU9FYmtWY05FWQ=="
  //   console.log('encodedCredentials:', encodedCredentials);
  //   try {
  //     const response = await axios.post(url, 'grant_type=client_credentials', {
  //       headers: {
  //         'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
  //         'Authorization': `Basic ${encodedCredentials}`,
  //         'User-Agent': 'My Twitter App v1.0.23',
  //         'Accept-Encoding': 'gzip',
  //       }
  //     });

  //     console.log('Token response:', response.data);
  //     return response.data;
  //   } catch (error) {
  //     console.error('Error fetching token:', error);
  //     throw error;
  //   }
  // }

  const onChangeInput = async () => {
    const res = await fetch('/api/tweet_app');
    const data = await res.json();
    console.log("data", data)
    // getUserTimeline()
    // getToken()
    
  };

  return (
    <div className="min-h-screen bg-[#14181D] text-gray-100 pt-[64px]  flex flex-col pb-2">
      <BackButton />
      <main className="flex-grow flex flex-col items-center  max-w-2xl mx-auto w-full">
        <div className="flex justify-center ">
          <ProgressStep number={1} active={true} />
          <ProgressStep number={2} active={true} />
          <ProgressStep number={3} active={false} />
        </div>

        <h1 className="text-[24px] opacity-[100%] mt-[32px] mb-[24px] font-[450] text-[#FFFFFF] text-center font-[family-name:var(--font-satoshi-sans)]">
          Submit X Post Link
        </h1>

        <div className="w-full max-w-[339px] space-y-4">
          <div className="bg-transparent px-[14px] pb-[12px] pt-[8px] border-[#71797E] border rounded-[12px]  ">
            <label
              htmlFor="post-link"
              className="block text-[12px] font-normal text-gray-400 "
            >
              Paste link here
            </label>
            <input
              type="text"
              id="post-link"
              className="w-full bg-transparent text-white outline-none text-[14px] font-medium font-[family-name:var(--font-satoshi-sans)]  rounded-md placeholder:text-[#ffff]"
              placeholder="https://x.com/coingecko/status/181499..."
              onChange={() => {
                onChangeInput()
              }}
            />
          </div>

          <div className="bg-transparent w-[339px]  border border-[#71797E]  py-[12px] px-[12px]  rounded-[14px] ">
            <h2 className="text-[16px] font-medium font-[family-name:var(--font-satoshi-sans)]">
              Details
            </h2>
            <ul className="list-disc list-inside  space-y-[3px] text-gray-300 text-[14px] font-[family-name:var(--font-satoshi-sans)]">
              <li className="text-[#BFBFBF]">
                Your post should contain the{" "}
                <span className="text-blue-500 ">#ConcordiumNet</span>{" "}
                <span className="ml-5">hashtag and mention</span>{" "}
                <span className="text-blue-500 ">@ConcordiumNet</span>
              </li>
              <li>The text can be anything you want</li>
              <li>Use the template below or write your own</li>
            </ul>

            <div className="p-[16px] bg-[#1A1F21] mt-[12px] rounded-lg relative">
              <button className="flex justify-center items-center gap-1 absolute top-2 right-2 bg-[#383E40] p-2 text-[12px] font-medium rounded-md hover:bg-gray-500 transition-colors">
                <Copy size={16} />
                <div>Copy</div>
              </button>
              <div className="flex items-center mb-2">
                <Image
                  src="/Images/Ellipse 1.svg"
                  width={40}
                  height={40}
                  alt="Profile picture"
                  className="rounded-full mr-2"
                />
                <div>
                  <p className="font-bold font-[family-name:var(--font-satoshi-sans)] text-[11px]">
                    Yourname
                    <Image
                      src="/Images/Verified.svg"
                      width={11}
                      height={11}
                      alt="Profile picture"
                      className="rounded-full ml-2 inline "
                    />
                  </p>
                  <p className="text-gray-400 text-[11px] font-[family-name:var(--font-satoshi-sans)]">
                    @yournickname
                  </p>
                </div>
              </div>
              <p className="text-[12px] font-normal font-[family-name:var(--font-satoshi-sans)]">
                Just created my{" "}
                <span className="text-[#1DA3F2]">
                  <a href="https://www.concordium.com/">@ConcordiumNet</a>
                </span>{" "}
                account and received 1000 $CCD reward! Go to
                concordium.com/wallet to get yours!
              </p>
              <p className="text-[#1DA3F2] text-[12px]">
                <a href="https://www.concordium.com/">#Concordium</a>
              </p>
              <p className="text-[#8E8E8E] text-xs sm:text-sm">
                XX:XX PM · Aug XX, 2024
              </p>
            </div>
          </div>
        </div>
        <Link href="/proof">
          <button className="bg-white w-[240px] mt-[80px] text-gray-900 font-semibold py-2 sm:py-3 px-6 rounded-full hover:bg-gray-200 transition-colors  max-w-xs">
            Continue
          </button>
        </Link>
      </main>
    </div>
  );
}
