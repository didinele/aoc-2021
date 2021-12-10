import { readFileSync } from 'fs';

export function combine<T>(...fs: [...Array<(x: any) => any>, (x: any) => T]): (x: any) => T {
	return (x) => fs.reduce((y, f) => f(y), x);
}

export function readInput(day: number): string;
export function readInput<T>(day: number, apply: (input: string) => T): T;
export function readInput<T = string>(day: number, apply?: (input: string) => T): T | string {
	const input = readFileSync(`./inputs/${day}.txt`, 'utf8');
	return apply?.(input) ?? input;
}

export const readNewline = (input: string) => input.split('\n');

export const mapNumber = (input: string[]) => input.map(Number);
