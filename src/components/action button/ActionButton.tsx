"use client";
import React from 'react'
import { ActionButtonProps } from '@/interface/interfaces'

const ActionButton: React.FC<ActionButtonProps> = ({ onClick, children, gradientBorder, background = "black" }) => {
    return (
        <>
            <style>{`
.button {
    height: 2.5rem;
    width: 11rem;
    background-color: ${background};
    border-radius: 8px;
    position: relative;
}    

.button::after, .button::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: calc(100% + 6px);
    height: calc(100% + 6px);
    padding: 5px;
    background-image: conic-gradient(${gradientBorder});
    z-index: -1;
    border-radius: 10px;
}
.button::before {
    filter: blur(1.5rem);
    opacity: .5;
}
`}</style>

            <button onClick={onClick} className={`button`}>
                {children}
            </button>
        </>
    );
};

export default ActionButton;