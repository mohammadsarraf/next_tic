'use client'
import React, { useState } from 'react';
import '../globals.css';

interface OptionsProps {
	joinGame: () => void;
	restGame: () => void;
}

const Options: React.FC<OptionsProps> = (props) => {

	const [isButtonClicked, setIsButtonClicked] = useState(true);

	const toggleAnimationClassSecondChild = isButtonClicked ? 'animate-move-back2' : 'animate-move-forward2';
	const toggleAnimationClassThirdChild = isButtonClicked ? 'animate-move-back3' : 'animate-move-forward3';
	const toggleAnimationClassForthChild = isButtonClicked ? 'animate-move-back4' : 'animate-move-forward4';

	const handleClick = () => {
		setIsButtonClicked(!isButtonClicked);
	};

	return (
		<div className='flex flex-col relative max-w-min ' onClick={handleClick}>
			<button className={`bg-violet-800 text-white font-bold w-20 h-20 text-4xl text-center rounded-lg m-5 mt-2 ml-2  cursor-pointer z-10`}
			>
				⚙
			</button>
			<button className={`bg-violet-800 text-white font-bold w-20 h-20 text-xl text-center rounded-lg m-5 mt-2 ml-2  cursor-pointer ${toggleAnimationClassSecondChild}`} onClick={props.joinGame}>Join Game</button>
			<button className={`bg-violet-800 text-white font-bold w-20 h-20 text-xl text-center rounded-lg  m-5 mt-2 ml-2 cursor-pointer ${toggleAnimationClassThirdChild}`} onClick={props.resetGame}>Reset Game</button>
			<button className={`bg-violet-800 text-white font-bold w-20 h-20 text-xl text-center rounded-lg m-5 mt-2 ml-2  cursor-pointer ${toggleAnimationClassForthChild}`}>HTP</button>
		</div>
	);
}

export default Options;