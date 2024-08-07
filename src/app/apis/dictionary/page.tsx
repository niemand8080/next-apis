"use client";
import axios from "axios";
import React, { useState, useRef } from 'react'

import Loader from '@/components/loader/Loader';

const Dictionary: React.FC = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const getWord = async () => {
        if (!inputRef.current) return;
        if (inputRef.current.value === "") return;
        setLoading(true);
        try {
            const response = await axios.post("/api", {
                fn: "searchInDictionary",
                args: [inputRef.current.value],
            });    
            console.log(response.data);
        } catch (error) {
            console.error("getWord -> error", error);
        }
        setLoading(false);
    };

    return (
        <>
            <div className='w-screen h-screen flex items-center justify-center flex-col'>
                <input  
                    type="text"
                    ref={inputRef}
                    placeholder="Type a word..."
                    className={`relative w-72 rounded-md bg-neutral-950 p-2 px-4 text-neutral-200 placeholder-neutral-500 outline-none focus:ring-1 focus:ring-neutral-700`}
                />
                <button onClick={getWord} disabled={loading} className="relative w-28 bottom-0 right-0 ml-3 flex items-center justify-center rounded-md bg-green-500 p-2 text-neutral-200 transition-all duration-150 hover:bg-green-600 focus:outline-none focus:ring-1 focus:ring-neutral-500 disabled:bg-neutral-700 disabled:hover:bg-neutral-800 cursor-pointer">
                    <Loader visible={loading} className="h-6 w-6">
                        Submit
                    </Loader>
                </button>
            </div>
        </>
    );
}

export default Dictionary;