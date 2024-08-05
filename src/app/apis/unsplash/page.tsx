"use client";
import React, { useState, useRef } from 'react';
import axios from 'axios';

import Loader from '@/components/loader/Loader';

const Unsplash: React.FC = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [image, setImage] = useState<any>();

    const getPhoto = async () => {
        if (!inputRef.current) return;
        if (inputRef.current.value === "") return;
        setLoading(true);
        try {
            const response = await axios.post("/api", {
                fn: "searchStockPhotos",
                args: [inputRef.current.value],
            });
            console.log(response.data);
            if (response.data.success) {
                setImage(response.data.photo);
            }
        } catch (error) {
            console.log("Unsplash Error: ", error);
        }
        setLoading(false); 
    };

    return (
        <>
            <div className="w-screen h-screen flex items-center justify-center flex-col">
                <div className="px-5 py-2 rounded-md bg-neutral-900 flex gap-5">
                    <input
                        type="text"
                        ref={inputRef}
                        placeholder="Type a word..."
                        className={`relative z-20 w-full rounded-md bg-neutral-950 p-2 px-4 text-neutral-200 placeholder-neutral-500 outline-none focus:ring-1 focus:ring-neutral-700`}
                    />
                    <button onClick={getPhoto} className="relative bottom-0 right-0 ml-3 flex items-center justify-center rounded-md bg-green-500 p-2 text-neutral-200 transition-all duration-150 hover:bg-green-600 focus:outline-none focus:ring-1 focus:ring-neutral-500">Submit</button>
                </div>
                <Loader visible={loading}></Loader>
            </div>
        </>
    );
};

export default Unsplash;