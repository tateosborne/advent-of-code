import { open } from 'fs/promises';
import path from 'path';

enum Direction {
  L = -1,
  R = 1,
}

async function grabRotations(fp: string, curr: number, atZeroCounter: number): Promise<void> {
    const f = await open(fp)

    for await (const r of f.readLines()) {
        const direction = r[0]
        const amount = r.replace(r[0], "")
        console.log(direction + " -> " + amount)
    }
}


function main(): void {
    const fp = path.join(__dirname, "../assets/day1.txt");

    let curr = 50
    let atZeroCounter = 0

    grabRotations(fp, curr, atZeroCounter)
}

main()
