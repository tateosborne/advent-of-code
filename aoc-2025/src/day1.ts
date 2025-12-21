import { open } from 'fs/promises';
import path from 'path';


async function solvePartOne(fp: string, curr: number): Promise<number> {
    const f = await open(fp)
    let res = 0;

    for await (const r of f.readLines()) {
        const direction = r[0];
        const rotation = Number(r.replace(r[0], ""));

        if (direction == "L")
            curr = (curr - rotation + 100) % 100;
        else
            curr = (curr + rotation) % 100;

        if (curr == 0) {
            res = res + 1;
        }
    }

    return res
}


async function unlockSafe(fp: string, curr: number): Promise<[number, number]> {
    const partOneRes = await solvePartOne(fp, curr);
    // const partTwoRes = await solvePartTwo();

    return [partOneRes, 0];
}


async function main(): Promise<void> {
    const fp = path.join(__dirname, "../assets/day1.txt");
    let curr = 50;

    const res = await unlockSafe(fp, curr);

    console.log(res);
}

main();
