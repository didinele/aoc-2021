import { combineLambdas, readLines } from '../util';

const parseBit = (x: string) => parseInt(x, 2);
const splitBits = (xs: string[]) => xs.map((x) => x.split('').map(parseBit));
const readBitTable = combineLambdas(readLines, splitBits);

export function solve1() {
	const inputs = readBitTable(3);

	let gamma = '';
	let epsilon = '';

	for (let rowIndex = 0; rowIndex < inputs[0]!.length; rowIndex++) {
		let zeroCount = 0;
		let oneCount = 0;

		for (const column of inputs) {
			const bit = column[rowIndex];
			if (bit === 0) {
				zeroCount++;
			} else {
				oneCount++;
			}
		}

		gamma += zeroCount < oneCount ? '1' : '0';
		epsilon += zeroCount > oneCount ? '1' : '0';
	}

	return parseInt(gamma, 2) * parseInt(epsilon, 2);
}

function filterTable(table: number[][], rowIndex: number, oxygen: boolean): number[][] {
	let zeroCount = 0;
	let oneCount = 0;

	const startWithZero: number[][] = [];
	const startWithOne: number[][] = [];

	for (const column of table) {
		const bit = column[rowIndex];
		if (bit === 0) {
			zeroCount++;
			startWithZero.push(column);
		} else {
			oneCount++;
			startWithOne.push(column);
		}
	}

	if (zeroCount === oneCount) {
		return oxygen ? startWithOne : startWithZero;
	}

	return (oxygen ? zeroCount > oneCount : zeroCount < oneCount) ? startWithZero : startWithOne;
}

export function solve2() {
	let oxygen = readBitTable(3);
	let co2 = readBitTable(3);

	let rowIndex = 0;
	while (oxygen.length > 1) {
		oxygen = filterTable(oxygen, rowIndex++, true);
	}

	rowIndex = 0;
	while (co2.length > 1) {
		co2 = filterTable(co2, rowIndex++, false);
	}

	return parseInt(oxygen[0]!.join(''), 2) * parseInt(co2[0]!.join(''), 2);
}
