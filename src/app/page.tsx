'use client'
import React, { useState, useEffect } from "react";
import Board from './Components/Board'
import ScoreBoard from "./Components/ScoreBoard";
import Dice from './Components/Dice'
import { initializeApp } from "firebase/app";
import { getFirestore, updateDoc } from "firebase/firestore";
import { doc, setDoc, onSnapshot, getDoc } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import Options from "./Components/Options";
import * as cotl from './Functions/Class';
import * as fb from './Functions/firebase'
import './Components/App.css';
import './Components/GameOver.css'


export default function Home() {

	const [playerOne, setPlayerOneBoard] = useState(Array(9).fill(null))
	const [playerTwo, setPlayerTwoBoard] = useState(Array(9).fill(null))
	const [sessionID, setSessionID] = useState("000000");
	const [playerXPlaying, setPlayerxPlayer] = useState(true)
	const [die, setDie] = useState(0)
	const [userName, setUserName] = useState("0")

	// const app = fb.app
	// const analytics = fb.analytics
	const db = fb.db

	const AlertSession = () => {
		const input: string | null = prompt("Please enter the session");

		if (input === null) {
			// The user canceled the prompt
			alert("Session ID input canceled.");
			return;
		}

		if (/^\d{6}$/.test(input)) {
			const ID: string = input; // Assign the input as is, since it's a 6-digit string
			setSessionID(ID);
			localStorage.setItem("userName", "2");
			setUserName("2");
		} else {
			alert("Invalid session ID. Please enter a valid session ID.");
		}
	};



	useEffect(() => {

		localStorage.setItem("userName", "1")
		setUserName("1")

	}, [])


	useEffect(() => {

		rotateDice()

	}, [die])


	useEffect(() => {
		const joinSession = async () => {
			let diemove = Math.floor(Math.random() * 6 + 1);
			fb.docSnap(sessionID, playerOne, setPlayerOneBoard, playerTwo, setPlayerTwoBoard, diemove, setDie, setPlayerxPlayer)
		}

		joinSession();
	}, []);



	useEffect(() => {
		const unsub = onSnapshot(doc(db, "Sessions", sessionID), (doc: any) => {

			setPlayerOneBoard(cotl.sort(doc.data().playerone))
			setPlayerTwoBoard(cotl.sort(doc.data().playertwo))
			setDie(doc.data().die)
			setPlayerxPlayer(doc.data().playerXPlaying)

		})


	}, [sessionID])

	const handleBoxClickPlayerOne = (indx: number) => {

		if (localStorage.getItem("userName") === "2") {
			return; // If playerTwo is stored in local storage, do nothing and return
		}

		const updateBoard = playerOne.map((value, index) => {
			if (index === indx && playerXPlaying === true) {

				cotl.updateChange(die, index, playerTwo);
				return die;
			} else {
				return value;
			}
		})

		if (playerXPlaying) {
			let diemove = Math.floor(Math.random() * 6 + 1);
			const Ref = doc(db, "Sessions", sessionID);
			updateDoc(Ref, {
				playerone: updateBoard,
				playertwo: playerTwo,
				playerXPlaying: false,
				die: diemove,
			});

		}

	}

	const handleBoxClickPlayerTwo = (indx: number) => {

		if (localStorage.getItem("userName") === "1") {
			return; // If playerTwo is stored in local storage, do nothing and return
		}

		const updateBoard = playerTwo.map((value, index) => {
			if (index === indx && playerXPlaying === false) {
				cotl.updateChange(die, index, playerOne)

				return die;
			} else {
				return value;
			}
		})

		if (!playerXPlaying) {

			const Ref = doc(db, "Sessions", sessionID);
			let diemove = Math.floor(Math.random() * 6 + 1);

			updateDoc(Ref, {
				playerone: playerOne,
				playertwo: updateBoard,
				playerXPlaying: true,
				die: diemove
			});

		}

	}

	const resetBoard = () => {
		rotateDice();
		const Ref = doc(db, "Sessions", sessionID);
		let diemove = Math.floor(Math.random() * 6 + 1);

		updateDoc(Ref, {
			playerone: Array(9).fill(null),
			playertwo: Array(9).fill(null),
			die: diemove,
			playerXPlaying: true

		});
	}

	const rotateDice = () => {
		const styles: CSSStyleDeclaration = getComputedStyle(document.body);

		// This section is only to make sure you select the whole dice
		const diceElement = document.getElementsByClassName("dice")[0] as HTMLElement | null;

		if (diceElement) {
			diceElement.classList.toggle('random-rotation');
			setTimeout(function () {
				diceElement.classList.remove('random-rotation');
			}, 1500);

			// Targeted side
			var facingSide = die;
			var transform = null;

			switch (facingSide) {
				case 1:
					transform = styles.getPropertyValue('--dice-face-one');
					break;
				case 2:
					transform = styles.getPropertyValue('--dice-face-two');
					break;
				case 3:
					transform = styles.getPropertyValue('--dice-face-three');
					break;
				case 4:
					transform = styles.getPropertyValue('--dice-face-four');
					break;
				case 5:
					transform = styles.getPropertyValue('--dice-face-five');
					break;
				case 6:
					transform = styles.getPropertyValue('--dice-face-six');
					break;
				default:
					transform = null;
			}

			if (transform !== null) {
				diceElement.style.transform = transform;
				diceElement.style.transition = "all 0.1s ease-out";
			}
		}
	}

	return (
		<>
			{cotl.handleGameOver(playerOne, playerTwo) ? (
				<section className="gameover-section">
					<section className="gameover-container">
						<h1 className="game-decision">{cotl.winner(playerOne, playerTwo)}</h1>
						<section className="button-section">
							<button onClick={resetBoard}>Reset Game</button>
							<button onClick={AlertSession}>Join Game</button>
						</section>
					</section>
				</section>

			) : (<></>)}
			<div className="Game">
				<ScoreBoard names={{ playerOneName: "POne", playerTwoName: "PTwo" }} scores={cotl.updateScore(playerOne, playerTwo)} playerXPlaying={playerXPlaying} ID={sessionID} />

				<Board name={"X"} board={playerOne} onClick={handleBoxClickPlayerOne} die={die} isPlaying={playerXPlaying} />
				<Dice rotateDice={rotateDice} />
				<Board name={"O"} board={playerTwo} onClick={handleBoxClickPlayerTwo} die={die} isPlaying={playerXPlaying} />
			</div>
			<Options resetGame={resetBoard} joinGame={AlertSession} />
		</>

	)
}
