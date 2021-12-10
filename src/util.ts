import { readFileSync } from 'fs';

export type Lambda<RT, Ts extends any[]> = (...args: Ts) => RT;

export const combineLambdas =
	<T, RT>(...fs: [Lambda<any, [T]>, ...Lambda<any, [any]>[], Lambda<RT, [any]>]): ((x: T) => RT) =>
	(x) =>
		fs.reduce((y, f) => f(y), x) as unknown as RT;

export const readInput = (day: number) => readFileSync(`./inputs/${day}.txt`, 'utf8');
export const readNewline = (input: string) => input.split('\n');
export const mapNumbers = (input: string[]) => input.map(Number);

export const readLines = combineLambdas(readInput, readNewline);
export const readNumbers = combineLambdas(readLines, mapNumbers);
