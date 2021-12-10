import { performance } from 'perf_hooks';

const args = process.argv.slice(2, 4) as [string?, string?];

if (args.length !== 2) {
	throw new Error('Usage: node --es-module-specifier-resolution=node ./dist/index.js <day> <part>');
}

const [day, part] = args.map(Number) as [number, 1 | 2];

interface Solution {
	solve1: () => any;
	solve2: () => any;
}

const solution: Solution | null = await import(`./solutions/${day}`).catch(() => null);

if (!solution) {
	throw new Error(`No solution for day ${day}`);
}

const start = performance.now();
const answer = part === 1 ? solution.solve1() : solution.solve2();
console.log(`Done running day ${day}, part ${part} in ${performance.now() - start}ms`);
console.log(answer);

export {};
