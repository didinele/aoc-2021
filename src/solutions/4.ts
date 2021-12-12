import { combineLambdas, range, readLines } from '../util';

interface BingoInput {
	numbers: number[];
	boards: number[][][];
}

const parseInput = (lines: string[]): BingoInput => {
	const input: BingoInput = {
		numbers: [],
		boards: [],
	};

	let skip = false;
	let boardIndex = 0;

	for (const line of lines) {
		if (skip) {
			skip = false;
			continue;
		}

		if (!input.numbers.length) {
			input.numbers = line.split(',').map(Number);
			skip = true;
			continue;
		}

		let board = input.boards[boardIndex];
		if (!board) {
			board = [];
			input.boards.push(board);
		}

		const numbers = line
			.trim()
			.split(/ +/g)
			.map((x) => Number(x));
		board.push(numbers);

		if (board.length === 5) {
			boardIndex++;
			skip = true;
		}
	}

	return input;
};

const readInput = combineLambdas(readLines, parseInput);

export function solve1() {
	const { numbers, boards } = readInput(4);

	const marks: boolean[][][] = Array.from({ length: boards.length }, () =>
		Array.from({ length: 5 }, () => Array(5).fill(false)),
	);

	const sums: number[] = boards.map((board) =>
		board.reduce((acc, col) => acc + col.reduce((acc, number) => acc + number), 0),
	);

	let winningBoardIndex: number | undefined;
	let lastCalledNumber: number | undefined;
	let done = false;

	for (const num of numbers) {
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		if (done) {
			break;
		}

		for (let boardIndex = 0; boardIndex < boards.length; boardIndex++) {
			const board = boards[boardIndex]!;
			const marksBoard = marks[boardIndex]!;

			if (done) {
				break;
			}

			for (let columnIndex = 0; columnIndex < 5; columnIndex++) {
				const column = board[columnIndex]!;
				const marksColumn = marksBoard[columnIndex]!;

				if (done) {
					break;
				}

				for (let rowIndex = 0; rowIndex < 5; rowIndex++) {
					const number = column[rowIndex]!;
					const marksRow = range(0, 5).map((i) => marksBoard[i]![rowIndex]!);

					if (number === num) {
						sums[boardIndex] -= number;
						marksColumn[rowIndex] = true;
						if (marksColumn.every((x) => x) || marksRow.every((x) => x)) {
							done = true;
							winningBoardIndex = boardIndex;
							lastCalledNumber = num;
							break;
						}
					}
				}
			}
		}
	}

	return sums[winningBoardIndex!]! * lastCalledNumber!;
}

export function solve2() {
	// const inputs = readInput(4);
}
