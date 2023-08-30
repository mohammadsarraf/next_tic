import React from 'react';
import '../globals.css';

interface BoxProps {
    name: string;
    value: number;
    onClick: () => void;
    mouseHoverTile: (e: React.MouseEvent<HTMLButtonElement>, isHovering: boolean) => void;
}

const Box: React.FC<BoxProps> = (props) => {

    return (
        <button
            className={`bg-white border-none rounded-md shadow-md w-16 h-16 
                        text-center text-6xl font-bold m-1.5 relative 
                        ${props.name==="X" ? 'text-purple-700' : 'text-green-700'}`}
            onClick={props.onClick}
            onMouseEnter={(e) => props.mouseHoverTile(e, true)}
            onMouseLeave={(e) => props.mouseHoverTile(e, false)}
        >
            {props.value}
        </button>
    );
};

export default Box;
