import React, { useState } from 'react';
import '../globals.css';

interface BoxProps {
	name: string;
	value: number;
	die: number;
	// style: string;
	className: string;
	highlightedClassName: string;
	onClick: () => void;
}

const Box: React.FC<BoxProps> = (props) => {
	const [isHovering, setIsHovering] = useState(false);

	return (
		<button
			className={`bg-white border-none rounded-md shadow-md w-16 h-16 
                  text-center text-6xl font-bold m-1.5 relative 
                  ${props.name === "X" ? 'text-purple-700' : 'text-green-700'}
                  ${props.highlightedClassName ? (props.highlightedClassName) : ('')}
				  ${(isHovering && !props.value) ? ('text-black text-opacity-25' ) : ('')}`}
			onClick={props.onClick}
			onMouseEnter={() => setIsHovering(true)}
			onMouseLeave={() => setIsHovering(false)}
		>
			{props.value ?
				(props.value)
					:
				(isHovering ? (props.die) : (''))
			}
		</button>
	);
};

export default Box;