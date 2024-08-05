"use client"
import React from 'react'
import ActionButton from '@/components/action button/ActionButton'
import { useRouter } from 'next/navigation';

const Page: React.FC = () => {
  const router = useRouter();
  return (
    <>
      <div className="h-screen w-screen flex items-center justify-center flex-col">
        <h1 className="text-8xl font-extrabold mb-10">API's</h1>
        <ActionButton 
          gradientBorder={"#22c55e, #22c55e"} 
          onClick={() => {
            router.push("/apis");
          }}
        >
          Get Starded
        </ActionButton>
      </div>
    </>
  )
};

export default Page;