"use client";
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { UnsplashResponse } from '@/interface/interfaces';

import Loader from '@/components/loader/Loader';
import Select from '@/components/select/Select'
import RepeatedElement from '@/components/repeated element/RepeatedElement'

const Unsplash: React.FC = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const divRef = useRef<HTMLDivElement>(null);
    const perPageSelectRef = useRef<HTMLSelectElement>(null);
    const orderSelectRef = useRef<HTMLSelectElement>(null);
    const colorSelectRef = useRef<HTMLSelectElement>(null);
    const orientationSelectRef = useRef<HTMLSelectElement>(null);

    const [imgPerPage, setImgPerPage] = useState<number>(9);
    const [loading, setLoading] = useState<boolean>(false);
    const [images, setImages] = useState<UnsplashResponse>();
    const [currentPage, setCurrentPage] = useState<number>(1);

    const placeholders = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10, 11, 12], [13, 14, 15], [16, 17, 18], [19, 20, 21], [22, 23, 24], [25, 26, 27], [28, 29, 30], [31, 32, 33], [34, 35, 36]];

    const getPhoto = async () => {
        if (!inputRef.current) return;
        if (inputRef.current.value === "") return;
        setLoading(true);
        try {
            const response = await axios.post("/api", {
                fn: "searchStockPhotos",
                args: [inputRef.current.value, currentPage, imgPerPage, orderSelectRef.current?.value, colorSelectRef.current?.value, orientationSelectRef.current?.value],
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
            <div className="w-screen h-screen flex items-center justify-center flex-col ">
                <div ref={divRef} className="px-5 py-2 absolute top-10 left-1/2 -translate-x-1/2 w-auto rounded-md bg-neutral-900 flex gap-5">
                    <input
                        type="text"
                        ref={inputRef}
                        placeholder="Type a word..."
                        className={`relative w-72 rounded-md bg-neutral-950 p-2 px-4 text-neutral-200 placeholder-neutral-500 outline-none focus:ring-1 focus:ring-neutral-700`}
                    />
                    <Select ref={perPageSelectRef} onChange={(e) => {setImgPerPage(Number(e.target.value))}}>
                        <option value={9}>9 / Page</option>
                        <option value={18}>18 / Page</option>
                        <option value={36}>36 / Page</option>
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
                    <button onClick={getPhoto} disabled={loading} className="relative w-28 bottom-0 right-0 ml-3 flex items-center justify-center rounded-md bg-green-500 p-2 text-neutral-200 transition-all duration-150 hover:bg-green-600 focus:outline-none focus:ring-1 focus:ring-neutral-500 disabled:bg-neutral-700 disabled:hover:bg-neutral-800 cursor-pointer">
                        <Loader visible={loading} className="h-6 w-6">
                            Submit
                        </Loader>
                    </button>
                </div>
                <div className={`absolute top-28 left-1/2 -translate-x-1/2`}>
                    {placeholders.map((placeholder: any[], index: number) => (
                        <React.Fragment key={index}>
                            <div className='flex gap-7 mb-7'>
                                {placeholder.map((num) => (
                                    <>
                                        {index < imgPerPage / 3 ? (
                                            <>
                                                {images && images[num - 1] ? (
                                                    <>
                                                        <div className='border-2 rounded-lg border-dashed flex items-center justify-center border-neutral-600 w-[300px] h-[300px] text-neutral-500'>
                                                            {images[num - 1].id}
                                                        </div>
                                                    </>
                                                ) : (
                                                    <div className='border-2 rounded-lg border-dashed flex items-center justify-center border-neutral-600 w-[300px] h-[300px] text-neutral-500'>
                                                        Loading image
                                                    </div>
                                                )}
                                            </>
                                        ) : null}
                                    </>
                                ))}
                            </div>
                        </React.Fragment>
                    ))}
                    {/* <RepeatedElement count={imgPerPage / 3}>
                        <div className='flex gap-7 mb-7'>
                            <RepeatedElement count={3}>
                                <div className='border-2 rounded-lg border-dashed flex items-center justify-center border-neutral-600 w-[300px] h-[300px] text-neutral-500'>
                                    Loading image
                                </div>
                            </RepeatedElement>
                        </div>
                    </RepeatedElement> */}
                </div>
            </div>
        </>
    );
};

export default Unsplash;