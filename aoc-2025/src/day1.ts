import { open } from 'fs/promises';
import path from 'path';


async function unlockSafe(fp: string, curr: number, atZeroCounter: number): Promise<number> {
    const f = await open(fp)

    for await (const r of f.readLines()) {
        const direction = r[0];
        const amount = Number(r.replace(r[0], ""));

        if (direction == "L")
            curr = (curr - amount + 100) % 100;
        else
            curr = (curr + amount) % 100;

        if (curr == 0) {
            atZeroCounter = atZeroCounter + 1;
        }
    }

    return atZeroCounter;
}


async function main(): Promise<void> {
    const fp = path.join(__dirname, "../assets/day1.txt");

    let curr = 50;
    let atZeroCounter = 0;

    const res = await unlockSafe(fp, curr, atZeroCounter);

    console.log(res);
}

main();
