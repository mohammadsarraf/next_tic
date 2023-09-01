import React from 'react';
import * as cotl from '../Functions/Class';
import Box from './Box';
import './Board.css';

interface BoardProps {
	name: string;
	board: number[];
	die: number;
	onClick: (index: number) => void;
	isPlaying: boolean;
}
const Board: React.FC<BoardProps> = (props) => {


	let col0 = cotl.match([props.board[0], props.board[3], props.board[6]]);
	let col1 = cotl.match([props.board[1], props.board[4], props.board[7]]);
	let col2 = cotl.match([props.board[2], props.board[5], props.board[8]]);

	return (
		<div className="board">
			{props.board.map((value: number, idx: number) => {
				let className = "box";

				// Add conditional classes based on isPlaying and box name
				if (props.isPlaying && props.name === "O") {
					className += " not-allowed";
				} else if (!props.isPlaying && props.name === "X") {
					className += " not-allowed";
				}

				let highlightedClassName = "";

				// Add highlighted-box classes based on your conditions
				if ([0, 3, 6].includes(idx) && (col0.length === 3 || (col0.length === 2 && col0.includes(idx / 3)))) {
					highlightedClassName = col0.length === 2 ? "highlighted-box2" : "highlighted-box3";
				}
				if ([1, 4, 7].includes(idx) && (col1.length === 3 || (col1.length === 2 && col1.includes((idx - 1) / 3)))) {
					highlightedClassName = col1.length === 2 ? "highlighted-box2" : "highlighted-box3";
				}
				if ([2, 5, 8].includes(idx) && (col2.length === 3 || (col2.length === 2 && col2.includes((idx - 2) / 3)))) {
					highlightedClassName = col2.length === 2 ? "highlighted-box2" : "highlighted-box3";
				}

				if (props.name === "X") {
					className += " x";
				} else if (props.name === "O") {
					className += " o";
				}

				return (
					<Box
						key={idx}
						die={props.die}
						className={className}
						highlightedClassName={highlightedClassName} // Pass the highlighted class name
						name={props.name}
						value={value}
						onClick={() => value === null && props.onClick(idx)}
					/>

				);
			})}
		</div>
	);
};

export default Board;