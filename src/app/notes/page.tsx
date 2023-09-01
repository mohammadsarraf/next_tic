'use client'
import React, { useEffect, useState } from 'react';
import '../globals.css';
import Options from '../Components/Options';
import Box from '../Components/Box';

export default function notes() {
    const [value, setValue] = useState(0)
    const [isHovering, setHovering] = useState(false)

    useEffect(() =>{
        const handleValue = () => {
            setValue(Math.floor(Math.random() * 6 + 1))
        }
        handleValue();
    },[value])

    return (
        <div className="bg-black min-h-screen">
            <h1 className='text-white m-1 text-4xl'>{value}</h1>

            <button className={`w-20 h-20 text-5xl bg-white m-5 rounded-md ${isHovering ? ("text-red-600"):("text-blue-700")}`} 
                    onMouseEnter={() => setHovering(true)}
                    onMouseLeave={() => setHovering(false)}
                    >
                {isHovering ? 
                    (value)
                        :
                    (null)}
            </button>
        </div>
    );
}
