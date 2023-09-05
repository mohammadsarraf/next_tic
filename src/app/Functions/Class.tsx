export const handleGameOver = (playerOne: (number | null)[], playerTwo: (number | null)[] ) => {
	if (!playerOne.includes(null) || !playerTwo.includes(null)) {
		return true
	}
	return false
};

export const points = (board: (number | null)[], index: number) => {
	const column = [board[index], board[index + 3], board[index + 6]];
  
	// Replace null values with 0 in the column
	const columnWithZeros = column.map((value) => (value === null ? 0 : value));
  
	if (columnWithZeros[0] === columnWithZeros[1] && columnWithZeros[0] === columnWithZeros[2]) {
	  return columnWithZeros[0] * 9;
	}
	if (columnWithZeros[0] === columnWithZeros[2]) {
	  return columnWithZeros[0] * 4 + columnWithZeros[1];
	}
	if (columnWithZeros[1] === columnWithZeros[2]) {
	  return columnWithZeros[1] * 4 + columnWithZeros[0];
	}
	if (columnWithZeros[0] === columnWithZeros[1]) {
	  return columnWithZeros[0] * 4 + columnWithZeros[2];
	} else {
	  return columnWithZeros[0] + columnWithZeros[1] + columnWithZeros[2];
	}
  };
  

export const updateScore = (playerOne: (number | null)[], playerTwo: (number | null)[] ) => {
	const calcScore = (player: (number | null)[]) => {
		return points(player, 0) + points(player, 1) + points(player, 2)
	}
	return ({ playerOne: calcScore(playerOne), playerTwo: calcScore(playerTwo) })
};

export const sort = (board: (number | null)[]) => {
	function moveZerosToEnd(arr: (number | null)[]) {
		let nonNull = [];
		let Null = [];

		for (let i = 0; i < arr.length; i++) {
			if (arr[i] === null) {
				Null.push(arr[i]);
			} else {
				nonNull.push(arr[i]);
			}
		}

		return nonNull.concat(Null);
	}

	const col0 = moveZerosToEnd([board[0], board[0 + 3], board[0 + 6]]);
	const col1 = moveZerosToEnd([board[1], board[1 + 3], board[1 + 6]]);
	const col2 = moveZerosToEnd([board[2], board[2 + 3], board[2 + 6]]);

	let combinedList1 = []
	for (let i = 0; i < 3; i++) {
		combinedList1.push(col0[i], col1[i], col2[i]);
	}

	return combinedList1
};

export const updateChange = (roll: number, index: number, player: (number | null)[]) => {
	let i = index % 3;

	if (player[i] === roll) {
		player[i] = null;
	}
	if (player[i + 3] === roll) {
		player[i + 3] = null;
	}
	if (player[i + 6] === roll) {
		player[i + 6] = null;
	}
	sort(player)
}

export const winner = (playerOne: (number | null)[], playerTwo: (number | null)[]) => {
	const list = updateScore(playerOne, playerTwo)

	if (list.playerOne > list.playerTwo) {
		return (
			"Player One Won!"
		)
	} else if (list.playerOne < list.playerTwo) {
		return (
			"Player Two Won!"

		)
	} else {
		return (
			"Game ended in a Tie!"
		)
	}
}

export const sessionIDGenerator = () => {
	const radnNum = (Math.floor(Math.random() * (10)))
	// return "Multi"
	return radnNum.toString().padStart(6, '0');
}

export const match = (array: number[]) => {

	let matchingIndexes: (number | null) [] = [];

	for (let i = 0; i < array.length; i++) {
		for (let j = i + 1; j < array.length; j++) {
			if (array[i] === array[j]) {
				if (!matchingIndexes.includes(i) && array[i] !== null) {
					matchingIndexes.push(i);
				}
				if (!matchingIndexes.includes(j) && array[j] !== null) {
					matchingIndexes.push(j);
				}
			}
		}
	}

	return matchingIndexes;
}

