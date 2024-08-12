// https://api.hypixel.net/v2/resources/skyblock/items
"use client";
import React, { useRef, useState } from "react";
import axios from "axios";

import Loader from "@/components/loader/Loader";

const Page: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const getItemData = async () => {
    console.log("1");
    if (!inputRef.current) return;
    console.log("2");
    if (inputRef.current.value = "") return;
    setLoading(true);
    try {
        console.log("Sending response!");
      const response = await axios.post("/api", {
        fn: "getItemData",
        args: [inputRef.current.value],
      });

      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <>
      <div className="flex h-screen w-screen items-center justify-center">
        <input
          type="text"
          ref={inputRef}
          placeholder="Type a word..."
          className={`relative w-72 rounded-md bg-neutral-950 p-2 px-4 text-neutral-200 placeholder-neutral-500 outline-none focus:ring-1 focus:ring-neutral-700`}
        />
        <button
          onClick={getItemData}
          disabled={loading}
          className="relative bottom-0 right-0 ml-3 flex w-28 cursor-pointer items-center justify-center rounded-md bg-green-500 p-2 text-neutral-200 transition-all duration-150 hover:bg-green-600 focus:outline-none focus:ring-1 focus:ring-neutral-500 disabled:bg-neutral-700 disabled:hover:bg-neutral-800"
        >
          <Loader visible={loading} className="h-6 w-6">
            Submit
          </Loader>
        </button>
      </div>
    </>
  );
};

export default Page;
