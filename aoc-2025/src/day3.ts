import { open } from "fs/promises";
import path from 'path';


async function readInput(fp: string): Promise<string> {
    const f = await open(fp);
    const fileContents = await f.readFile({ encoding: 'utf8' });
    const contents = String(fileContents);
    await f.close();

    return contents;
}

function findJoltage(banks: string[], digits: number): Number {
    let joltages: string[][] = [];

    for (const bank of banks) {
        let batteries: string[] = new Array();
        let curr = 0;
        let limit = bank.length - digits;

        while (batteries.length < 12) {
            let max = -1;
            let maxIdx = -1;

            while (curr <= limit) {
                const candidate = Number(bank[curr]);

                if (candidate > max) {
                    max = candidate;
                    maxIdx = curr;
                }
                curr = curr + 1;
            }

            batteries.push(String(max));
            curr = maxIdx + 1;
            limit = limit + 1;
        }

        joltages.push(batteries);
    }

    const sum = joltages.reduce((total, row) => {
        const num = row.reduce((acc, digit) => acc + digit, "");
        return total + Number(num);
    }, 0);

    return sum;
}


async function main() {
    const filePath = path.join(__dirname, "../assets/day3/input.txt");
    const contents = await readInput(filePath);
    const banks: string[] = contents.split("\n");

    let idx = banks.indexOf('');
    if (idx != -1)
        banks.splice(idx);

    const res = findJoltage(banks, 12);

    console.log(res);
}

main()
