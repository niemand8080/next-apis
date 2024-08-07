"use client";
import React, { useState, useRef } from 'react';
import axios from 'axios';

import Loader from '@/components/loader/Loader';
import Select from '@/components/select/Select'
import RepeatedElement from '@/components/repeated element/RepeatedElement'

const Unsplash: React.FC = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const perPageSelectRef = useRef<HTMLSelectElement>(null);
    const orderSelectRef = useRef<HTMLSelectElement>(null);
    const colorSelectRef = useRef<HTMLSelectElement>(null);
    const orientationSelectRef = useRef<HTMLSelectElement>(null);

    const [loading, setLoading] = useState<boolean>(false);
    const [images, setImages] = useState<any>();

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
                setImages(response.data.photos);
            }
        } catch (error) {
            console.log("Unsplash Error: ", error);
        }
        setLoading(false); 
    };

    return (
        <>
            <div className="w-screen h-screen flex items-center justify-center flex-col">
                <div className="px-5 py-2 absolute top-10 left-1/2 -translate-x-1/2 w-auto rounded-md bg-neutral-900 flex gap-5">
                    <input
                        type="text"
                        ref={inputRef}
                        placeholder="Type a word..."
                        className={`relative w-72 rounded-md bg-neutral-950 p-2 px-4 text-neutral-200 placeholder-neutral-500 outline-none focus:ring-1 focus:ring-neutral-700`}
                    />
                    <Select ref={perPageSelectRef}>
                        <option value={9}>9 - Pages</option>
                        <option value={18}>18 - Pages</option>
                        <option value={36}>36 - Pages</option>
                    </Select>
                    <Select ref={orderSelectRef}>
                        <option value={"relevant"}>relevant</option>
                        <option value={"latest"}>latest</option>
                    </Select>
                    <Select ref={colorSelectRef}>
                        <option value={""}>none</option>
                        <option value={"black_and_white"}>black/white</option>
                        <option value={"black"}>black</option>
                        <option value={"white"}>white</option>
                        <option value={"yellow"}>yellow</option>
                        <option value={"orange"}>orange</option>
                        <option value={"red"}>red</option>
                        <option value={"purple"}>purple</option>
                        <option value={"magenta"}>magenta</option>
                        <option value={"green"}>green</option>
                        <option value={"teal"}>teal</option>
                        <option value={"blue"}>blue</option>
                    </Select>
                    <Select ref={orientationSelectRef}>
                        <option value={""}>none</option>
                        <option value={"landscape"}>landscape</option>
                        <option value={"portrait"}>portrait</option>
                        <option value={"squarish"}>squarish</option>
                    </Select>
                    <button onClick={getPhoto} className="relative bottom-0 right-0 ml-3 flex items-center justify-center rounded-md bg-green-500 p-2 text-neutral-200 transition-all duration-150 hover:bg-green-600 focus:outline-none focus:ring-1 focus:ring-neutral-500">Submit</button>
                </div>
                <div className={``}>
                    <RepeatedElement count={1}>
                        hi
                    </RepeatedElement>
                </div>
            </div>
        </>
    );
};

export default Unsplash;