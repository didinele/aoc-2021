import { combineLambdas, readLines } from '../util';

const enum Direction {
	forward = 'forward',
	down = 'down',
	up = 'up',
}

const parseCourse = (inputs: string[]): [direction: Direction, units: number][] =>
	inputs.map((input) => {
		const [direction, units] = input.split(' ');
		return [direction as Direction, Number(units)];
	});

const readCourse = combineLambdas(readLines, parseCourse);

export function solve1() {
	const inputs = readCourse(2);

	let position = 0;
	let depth = 0;

	for (const [direction, units] of inputs) {
		if (direction === Direction.forward) {
			position += units;
		} else if (direction === Direction.down) {
			depth += units;
		} else {
			depth -= units;
		}
	}

	return position * depth;
}

export function solve2() {
	const inputs = readCourse(2);

	let position = 0;
	let depth = 0;
	let aim = 0;

	for (const [direction, units] of inputs) {
		if (direction === Direction.forward) {
			position += units;
			depth += aim * units;
		} else if (direction === Direction.down) {
			aim += units;
		} else {
			aim -= units;
		}
	}

	return position * depth;
}
