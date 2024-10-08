"use client";
import React, { useEffect, useState, useRef } from 'react'

const Page: React.FC = () => {
    const inputRef = useRef<HTMLInputElement>(null)
    return (
        <>
            <div className='w-screen h-screen flex items-center justify-center'>
                Test
            </div>
        </>
    );
}

export default Page

/*
1. npm install react-email @react-email/components -E
2. create `email` folder andd add .tsx file
3. add `"email": "email dev"` to package.json
4. npm run email
5. https://demo.react.email/preview/magic-links/plaid-verify-identity?view=source&lang=jsx
*/
