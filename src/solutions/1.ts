import { readNumbers } from '../util';

export function solve1() {
	const inputs = readNumbers(1);

	return inputs.reduce<{ increased: number; num: number }>(
		(acc, x) => {
			if (x > acc.num) {
				acc.increased++;
			}

			acc.num = x;
			return acc;
		},
		{
			increased: 0,
			num: inputs[0]!,
		},
	).increased;
}

export function solve2() {
	const inputs = readNumbers(1);

	let increased = 0;
	let prev: number | null = null;

	for (let i = 0; i < inputs.length; i++) {
		const sum = inputs.slice(i, i + 3).reduce((acc, x) => acc + x);

		if (prev !== null && sum > prev) {
			increased++;
		}

		prev = sum;
	}

	return increased;
}
