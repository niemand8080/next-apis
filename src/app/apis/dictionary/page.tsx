"use client";
import axios from "axios";
import React, { useState, useRef } from 'react'
import { WordProps } from "@/interface/interfaces";

import Loader from '@/components/loader/Loader';

const Dictionary: React.FC = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [word, setWord] = useState<WordProps | null>(null);

    const getWord = async () => {
        if (!inputRef.current) return;
        if (inputRef.current.value === "") return;
        setLoading(true);
        try {
            const response = await axios.post("/api", {
                fn: "searchInDictionary",
                args: [inputRef.current.value],
            });    
            // console.log(response.data);
            if (response.data.success) {
                setWord(response.data.word);
            }
        } catch (error) {
            console.error("getWord -> error", error);
        }
        setLoading(false);
    };

    return (
        <>
            <div className='w-screen h-screen flex items-center justify-center flex-col'>
                <h1 className="text-4xl absolute top-10 left-1/2 -translate-x-1/2 font-bold">Dictionary</h1>
                <div className="px-5 py-2 absolute top-28 left-1/2 -translate-x-1/2 w-auto rounded-md bg-neutral-900 flex gap-5">
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
                <div className="w-11/12">
                    
                </div>
            </div>
        </>
    );
}

// interface Phonetic {
//     text: string;
//     audio?: string;
//   }
  
//   interface Definition {
//     definition: string;
//     example?: string;
//     synonyms: string[];
//     antonyms: string[];
//   }
  
//   interface Meaning {
//     partOfSpeech: string;
//     definitions: Definition[];
//   }
  
//   interface WordProps {
//     word: string;
//     phonetic: string;
//     phonetics: Phonetic[];
//     origin: string;
//     meanings: Meaning[];
//   }

export default Dictionary;