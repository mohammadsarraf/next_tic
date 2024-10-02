import { initializeApp } from "firebase/app";
import { getFirestore, updateDoc } from "firebase/firestore";
import { doc, setDoc, onSnapshot, getDoc } from "firebase/firestore";
import * as cotl from './Class'
import { unsubscribe } from "diagnostics_channel";

export const firebaseConfig = {
	apiKey: "AIzaSyB59e0ZGSM9c4p4Ol2vDimOua0qDo93mMw",
	authDomain: "nextticeu.firebaseapp.com",
	projectId: "nextticeu",
	storageBucket: "nextticeu.appspot.com",
	messagingSenderId: "282692780031",
	appId: "1:282692780031:web:2909039d581e9b79f331ca",
	measurementId: "G-JLK99ZQVPV"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);


export const docSnap = async (sessionID: any, playerOne: any, setPlayerOneBoard: any, playerTwo: any, setPlayerTwoBoard: any, diemove: any, setDie: any, setPlayerxPlayer: any) => {
	const docRef = doc(db, "Sessions", sessionID);
	const docSnap = await getDoc(docRef);

	if (docSnap.exists()) {
		setPlayerOneBoard(docSnap.data().playerone)
		setPlayerTwoBoard(docSnap.data().playertwo)
		setDie(docSnap.data().die)
		setPlayerxPlayer(docSnap.data().playerXPlaying)
	} else {
		// doc.data() will be undefined in this case
		await setDoc(doc(db, "Sessions", sessionID), {
			playerone: playerOne,
			playertwo: playerTwo,
			die: diemove,
			finished: cotl.handleGameOver(playerOne, playerTwo),
			playerXPlaying: true,
		});
	}
	setDie(diemove)

}
