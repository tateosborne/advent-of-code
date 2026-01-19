import { open } from "fs/promises";
import path from 'path';


async function readInput(fp: string): Promise<string> {
    const f = await open(fp);
    const fileContents = await f.readFile({ encoding: 'utf8' });
    const contents = String(fileContents);
    await f.close();

    return contents;
}

function findJoltage(banks: string[]): Number {
    let joltages: Number[] = [];

    for (const bank of banks) {
        let maxTens = -1;
        let maxTensIdx = -1;
        let maxDigit = -1;

        for (let i=0; i<bank.length-1; i++) {
            const candidate = Number(bank[i]);

            if (candidate > maxTens) {
                maxTens = candidate;
                maxTensIdx = i;
            }
        }

        for (let i=maxTensIdx+1; i<bank.length; i++) {
            const candidate = Number(bank[i]);

            if (candidate > maxDigit)
                maxDigit = candidate;
        }

        joltages.push(Number(String(maxTens) + String(maxDigit)));
    }

    return joltages.reduce(
        (a, b) => a.valueOf() + b.valueOf()
    );
}


async function main() {
    const filePath = path.join(__dirname, "../assets/day3/input.txt");
    const contents = await readInput(filePath);
    const banks: string[] = contents.split("\n");

    let idx = banks.indexOf('');
    if (idx != -1)
        banks.splice(idx);

    const res = findJoltage(banks);

    console.log(res);
}

main()
