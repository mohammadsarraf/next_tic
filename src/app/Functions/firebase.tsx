import { initializeApp } from "firebase/app";
import { getFirestore, updateDoc } from "firebase/firestore";
import { doc, setDoc, onSnapshot, getDoc } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import * as cotl from './Class'
import { unsubscribe } from "diagnostics_channel";

export const firebaseConfig = {
	apiKey: "AIzaSyBl51OUfM0focTTZ3nFA-TJXq7lgpwehVA",
	authDomain: "cotl-outside.firebaseapp.com",
	projectId: "cotl-outside",
	storageBucket: "cotl-outside.appspot.com",
	messagingSenderId: "958358712279",
	appId: "1:958358712279:web:38683e28882b302c636592",
	measurementId: "G-5N4KQBW16K"
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
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
