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

	// const width = screen.width
	return (
		<>
			<div className={`flex flex-col relative max-w-min `}>
				<button className={`bg-violet-800 text-white h-20 text-4xl text-center rounded-lg m-5 mt-2 ml-2  cursor-pointer z-10`} onClick={handleClick}
				>
					⚙
				</button>
				<button className={`bg-violet-800 text-white  ${false ? (` w-auto h-auto p-2 text-sm mb-auto mt-4 ml-1`) : (`w-20 h-20  font-bold ${toggleAnimationClassSecondChild}`)}  text-xl  text-center rounded-lg  m-5 mt-2 ml-2  cursor-pointer `} onClick={props.joinGame}>Join Game</button>
				<button className={`bg-violet-800 text-white  ${false ? (` w-auto h-auto p-2 text-sm mb-auto mt-4 ml-1`) : (`w-20 h-20  font-bold ${toggleAnimationClassThirdChild}`)}  text-xl  text-center rounded-lg  m-5 mt-2 ml-2 cursor-pointer `} onClick={props.resetGame}>Reset Game</button>
				<button className={`bg-violet-800 text-white  ${false ? (` w-auto h-auto p-2 text-sm mb-auto mt-4 ml-1`) : (`w-20 h-20  font-bold ${toggleAnimationClassForthChild}`)} text-xl  text-center rounded-lg  m-5 mt-2 ml-2  cursor-pointer `}>HTP</button>
			</div>
		</>
	);
}

export default Options;