'use client'
import React, { useState } from 'react';
import '../globals.css';

interface OptionsProps {
	joinGame: () => void;
	resetGame: () => void;
}

const Options: React.FC<OptionsProps> = (props) => {

	const [isClicked, setIsClicked] = useState(false);

	const toggleAnimationClassSecondChild = isClicked ? 'animate-move-back2' : 'animate-move-forward2';
	const toggleAnimationClassThirdChild = isClicked ? 'animate-move-back3' : 'animate-move-forward3';
	const toggleAnimationClassForthChild = isClicked ? 'animate-move-back4' : 'animate-move-forward4';

	const handleClick = () => {
		setIsClicked(!isClicked);
	};

	return (
		<>				<div className={`flex flex-col relative  max-w-min`}>
					<button className={`bg-violet-800 text-white font-bold w-20 h-20 text-4xl text-center rounded-lg m-5 mt-2 ml-2  cursor-pointer z-10`} onClick={handleClick}
					>
						⚙
					</button>
					<button className={`bg-violet-800 text-white font-bold w-20 h-20 text-xl text-center rounded-lg m-5 mt-2 ml-2  cursor-pointer ${toggleAnimationClassSecondChild}`} onClick={props.joinGame}>Join Game</button>
					<button className={`bg-violet-800 text-white font-bold w-20 h-20 text-xl text-center rounded-lg  m-5 mt-2 ml-2 cursor-pointer ${toggleAnimationClassThirdChild}`} onClick={props.resetGame}>Reset Game</button>
					<button className={`bg-violet-800 text-white font-bold w-20 h-20 text-xl text-center rounded-lg m-5 mt-2 ml-2  cursor-pointer ${toggleAnimationClassForthChild}`}>HTP</button>
				</div>
			{/* {isClicked ? (		
				<div className={`flex flex-col relative  max-w-min ${isClicked ? ("bg-red-700"):("bg-blue-600")}`} onClick={handleClick}>
					<button className={`bg-violet-800 text-white font-bold w-20 h-20 text-4xl text-center rounded-lg m-5 mt-2 ml-2  cursor-pointer z-10`}
					>
						⚙
					</button>
					<button className={`bg-violet-800 text-white font-bold w-20 h-20 text-xl text-center rounded-lg m-5 mt-2 ml-2  cursor-pointer ${toggleAnimationClassSecondChild}`} onClick={props.joinGame}>Join Game</button>
					<button className={`bg-violet-800 text-white font-bold w-20 h-20 text-xl text-center rounded-lg  m-5 mt-2 ml-2 cursor-pointer ${toggleAnimationClassThirdChild}`} onClick={props.resetGame}>Reset Game</button>
					<button className={`bg-violet-800 text-white font-bold w-20 h-20 text-xl text-center rounded-lg m-5 mt-2 ml-2  cursor-pointer ${toggleAnimationClassForthChild}`}>HTP</button>
				</div>
				):(
				<div className={`flex flex-col relative  max-w-min ${isClicked ? ("max-h-min"):("max-h-min")}`} onClick={handleClick}>
					<button className={`bg-violet-800 text-white font-bold w-20 h-20 text-4xl text-center rounded-lg m-5 mt-2 ml-2  cursor-pointer z-10`}
					>
						⚙
					</button>
					<button className={`bg-violet-800 text-white font-bold w-20 h-20 text-xl text-center rounded-lg m-5 mt-2 ml-2  cursor-pointer ${toggleAnimationClassSecondChild}`} onClick={props.joinGame}>Join Game</button>
					<button className={`bg-violet-800 text-white font-bold w-20 h-20 text-xl text-center rounded-lg  m-5 mt-2 ml-2 cursor-pointer ${toggleAnimationClassThirdChild}`} onClick={props.resetGame}>Reset Game</button>
					<button className={`bg-violet-800 text-white font-bold w-20 h-20 text-xl text-center rounded-lg m-5 mt-2 ml-2  cursor-pointer ${toggleAnimationClassForthChild}`}>HTP</button>
				</div>
				)} */}
		</>
	);
}

export default Options;