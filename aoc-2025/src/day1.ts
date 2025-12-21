import { open } from 'fs/promises';
import path from 'path';


async function solvePartOne(fp: string, curr: number): Promise<number> {
    const f = await open(fp);
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

    return res;
}


async function solvePartTwo(fp: string, curr: number): Promise<number> {
    const f = await open(fp);
    let res = 0;

    const calcRedundants = (rotation: number) => {
        return Math.floor(rotation / 100);
    };

    for await (const r of f.readLines()) {
        const direction = r[0];
        let rotation = Number(r.replace(r[0], ""));
        const redundants = calcRedundants(rotation);

        res = res + redundants;
        rotation = rotation - (redundants * 100);

        if (direction == "L") {
            const prev = curr;
            const temp = curr - rotation;
            curr = (temp + 100) % 100;

            if (prev > 0 && temp <= 0) 
                res = res + 1;
        }
        else {
            const prev = curr;
            const temp = curr + rotation;
            curr = temp % 100;

            if (prev < 100 && temp >= 100)
                res = res + 1;
        }

    }

    return res
}


async function unlockSafe(fp: string, curr: number): Promise<[number, number]> {
    const partOneRes = await solvePartOne(fp, curr);
    const partTwoRes = await solvePartTwo(fp, curr);

    return [partOneRes, partTwoRes];
}


async function main(): Promise<void> {
    const fp = path.join(__dirname, "../assets/day1.txt");
    let curr = 50;

    const res = await unlockSafe(fp, curr);

    console.log(res);
}

main();
