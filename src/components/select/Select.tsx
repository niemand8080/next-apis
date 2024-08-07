"use client";
import React, { forwardRef } from 'react'
import { SelectProps } from '@/interface/interfaces'

const Select =  forwardRef<HTMLSelectElement, SelectProps>(({ children }, ref) => {
    return (
        <>
            <div className="relative w-full">
                <select
                    ref={ref}
                    name={`${ref}`}
                    className="w-full cursor-pointer appearance-none rounded-md bg-neutral-950 px-3 py-2 text-neutral-200 transition-all duration-150 ease-in-out focus:outline-none focus:ring-1 focus:ring-neutral-700"
                >
                    {children}
                </select>
                <svg
                    className="pointer-events-none absolute right-2 top-1/2 z-0 h-4 w-4 -translate-y-1/2 transform fill-current text-neutral-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
          </div>
        </>
    );
});

export default Select